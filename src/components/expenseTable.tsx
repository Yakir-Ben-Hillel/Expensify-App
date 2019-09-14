import { MaterialUiPickersDate } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import { AppState, ISnackBar, Row } from '../redux/@types/state-interfaces';
import { SetSnackBarStatus } from '../redux/@types/types';
import {
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpenses
} from '../redux/actions/expensesActions';
import { setSnackBarStatus } from '../redux/actions/snackBarActions';
import Amount from './FormComponents/AmountComponent';
import DateComponent from './FormComponents/DateComponent';
import Description from './FormComponents/DescriptionComponent';
import Note from './FormComponents/NoteComponent';
import { Breakpoint } from 'react-socks';
import MobileExpenses from './mobileExpenses';
import ErrorSnackBar from './SnackBars/errorBar';
import { whichErrorMassageToDisplay } from './ExpenseFormFnc';
export interface IProps {
  expenses: Row[];
  startEditExpense: (
    id: string,
    update: {
      id?: string;
      description?: string;
      amount?: number;
      createdAt?: string;
      note?: string;
    }
  ) => void;
  startRemoveExpense: (id: string) => void;
  startSetExpenses: () => void;
  startAddExpense: (expenseData: {
    description: string;
    note?: string;
    amount: number;
    createdAt?: string;
  }) => void;
  setSnackBarStatus: (snackBarStatus: ISnackBar) => SetSnackBarStatus;
}

export const ExpenseList: React.FC<IProps> = props => {
  const [selectedRow, SetSelectedRow] = React.useState();
  const [massage, SetMassage] = React.useState();
  return (
    <div>
      <Breakpoint medium up>
        <MaterialTable
          title='Expenses List'
          columns={[
            {
              title: 'Description',
              field: 'description',
              cellStyle: {
                wordBreak: 'break-word',
                wordWrap: 'break-word'
              },
              editComponent: props => (
                <Description
                  description={props.value}
                  onDescriptionChange={e => {
                    props.onChange(e.target.value);
                  }}
                />
              )
            },
            {
              title: 'Amount',
              field: 'amount',
              editComponent: props => (
                <Amount
                  amount={props.value}
                  onAmountChange={e => {
                    const amount = e.target.value;
                    if (amount.match(/^\d{1,}(\.\d{0,2})?$/) || amount === '') {
                      props.onChange(amount);
                    }
                  }}
                />
              )
            },
            {
              title: 'CreatedAt',
              field: 'createdAt',
              editComponent: props => (
                <DateComponent
                  createdAt={props.value}
                  onDateChange={(createdAt: MaterialUiPickersDate) => {
                    if (createdAt) {
                      props.onChange(createdAt.toDateString());
                    }
                  }}
                />
              )
            },

            {
              title: 'Note',
              field: 'note',
              editComponent: props => (
                <Note
                  note={props.value}
                  onNoteChange={e => {
                    props.onChange(e.target.value);
                  }}
                />
              ),
              cellStyle: {
                wordBreak: 'break-word',
                wordWrap: 'break-word',
                maxWidth: '220px'
              }
            }
          ]}
          data={props.expenses}
          onRowClick={(e, selectedRow) => SetSelectedRow(selectedRow)}
          options={{
            rowStyle: rowData => ({
              backgroundColor:
                selectedRow && selectedRow.tableData.id === rowData.tableData.id
                  ? '#EEE'
                  : '#FFF'
            })
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (oldData && newData.description && newData.amount) {
                    if (oldData.id)
                      props.startEditExpense(oldData.id, {
                        description: newData.description,
                        amount: newData.amount,
                        createdAt: newData.createdAt,
                        note: newData.note
                      });
                  } else {
                    SetMassage(
                      whichErrorMassageToDisplay(
                        newData.description,
                        newData.amount
                      )
                    );
                    props.setSnackBarStatus({
                      isOpenAddExpense: false,
                      isOpenError: true
                    });
                    reject('Invalid input.');
                  }
                  resolve();
                }, 2000);
              }),

            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (newData.description && newData.amount) {
                    props.startAddExpense({
                      description: newData.description,
                      note: newData.note,
                      amount: newData.amount,
                      createdAt: newData.createdAt
                    });
                    props.setSnackBarStatus({
                      isOpenAddExpense: true,
                      isOpenError: false
                    });
                    resolve();
                  } else {
                    SetMassage(
                      whichErrorMassageToDisplay(
                        newData.description,
                        newData.amount
                      )
                    );
                    props.setSnackBarStatus({
                      isOpenAddExpense: false,
                      isOpenError: true
                    });
                    reject('Invalid input.');
                  }
                }, 2000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (oldData.id) props.startRemoveExpense(oldData.id);
                  resolve();
                }, 2000);
              })
          }}
        />
        <ErrorSnackBar variant='error' massage={massage} />
      </Breakpoint>
      <Breakpoint small down>
        <MobileExpenses />
      </Breakpoint>
    </div>
  );
};
const mapDispatchToProps = {
  startEditExpense,
  startRemoveExpense,
  startSetExpenses,
  startAddExpense,
  setSnackBarStatus
};
const mapStateToProps = (state: AppState) => {
  return {
    expenses: state.expenses
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList);
