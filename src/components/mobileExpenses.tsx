import {
  Container,
  ExpansionPanelActions,
  Tooltip,
  Fab
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import SearchBar from './searchBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NoteIcon from '@material-ui/icons/Note';
import React from 'react';
import { connect } from 'react-redux';
import {
  AppState,
  IExpense,
  ISnackBar,
  IFilter
} from '../redux/@types/state-interfaces';
import { SetSnackBarStatus } from '../redux/@types/types';
import {
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpenses
} from '../redux/actions/expensesActions';
import { setSnackBarStatus } from '../redux/actions/snackBarActions';
import Button from '@material-ui/core/Button';
import BackgroundImage from '../images/no-data-template.jpg';
import RemoveDialog from './FormComponents/removeDialog';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from './FormComponents/formDialog';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import visibleExpenses from '../redux/selectors/visibleExpenses';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      fontSize: theme.typography.pxToRem(15)
    },
    noInfoContainer: {
      display: 'block',
      height: '80vh',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: theme.palette.text.secondary
    },
    heading: {
      flexBasis: '66.66%',
      flexShrink: 0
    },
    secondaryHeading: {
      color: theme.palette.text.secondary,
      display: 'block',
      width: '80%',
      alignItems: 'center'
    },
    fixed: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3)
    },
    actionButtons: {
      margin: 0,
      padding: '0 0 8px 0'
    }
  })
);
interface IProps {
  expenses: IExpense[];
  filters: IFilter;
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
const MobileExpensesList: React.FC<IProps> = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [expenseToEdit, setExpenseToEdit] = React.useState();
  const [uid, SetUid] = React.useState<string | null>('');
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const filteredExpenses = visibleExpenses(props.expenses, props.filters.text);
  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      {props.expenses.length === 0 ? (
        <div>
          <Container maxWidth='md' className={classes.noInfoContainer}>
            {' '}
            <Typography variant='h6'>Add an expense to start</Typography>
          </Container>
          <FormDialog
            open={formDialogOpen}
            setDialogOpen={setFormDialogOpen}
            isUpdating={false}
          />
        </div>
      ) : (
        <div>
          <Container maxWidth='md'>
            <Typography variant='h6'>Expenses List</Typography>
            <SearchBar />
            <RemoveDialog
              open={removeDialogOpen}
              setDialogOpen={setRemoveDialogOpen}
              uid={uid}
            />
            <FormDialog
              open={formDialogOpen}
              setDialogOpen={setFormDialogOpen}
              isUpdating={isUpdating}
              expense={expenseToEdit}
            />
            {filteredExpenses.map((expense, index) => (
              <ExpansionPanel
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {expense.description}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    ${expense.amount}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.secondaryHeading}>
                  <Typography>
                    <EventNoteIcon />
                    Created At: {expense.createdAt}
                  </Typography>
                  {expense.note && (
                    <Typography variant='body1'>
                      <NoteIcon /> Note: {expense.note}
                    </Typography>
                  )}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  <Tooltip title='Edit' aria-label='edit'>
                    <Button
                      className={classes.actionButtons}
                      size='small'
                      color='primary'
                      onClick={() => {
                        setExpenseToEdit(expense);
                        setIsUpdating(true);
                        setFormDialogOpen(true);
                      }}
                    >
                      <EditOutlinedIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Remove' aria-label='remove'>
                    <Button
                      className={classes.actionButtons}
                      size='small'
                      color='secondary'
                      onClick={() => {
                        SetUid(expense.id);
                        setRemoveDialogOpen(true);
                      }}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  </Tooltip>
                </ExpansionPanelActions>
              </ExpansionPanel>
            ))}
          </Container>
        </div>
      )}
      <Tooltip title='Add' aria-label='add'>
        <Fab
          color='secondary'
          className={classes.fixed}
          onClick={() => {
            setIsUpdating(false);
            setFormDialogOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
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
    expenses: state.expenses,
    filters: state.filters,
    snackBar: state.snackBar
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileExpensesList);
