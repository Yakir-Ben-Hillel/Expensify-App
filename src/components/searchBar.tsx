import React from 'react';
import {
  InputAdornment,
  TextField,
  FormControl,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { setTextFilter } from '../redux/actions/filterActions';
import { connect } from 'react-redux';
import { AppState, IFilter } from '../redux/@types/state-interfaces';
import { SetTextFilter } from '../redux/@types/types';
interface IProps {
  filters: IFilter;
  setTextFilter: (text: string) => SetTextFilter;
}
const SearchBar: React.FC<IProps> = props => {
  return (
    <div>
      <FormControl>
        <TextField
          id='filled-adornment-search'
          placeholder='Search'
          value={props.filters.text}
          style={{
              marginBottom:'10px'
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setTextFilter(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => props.setTextFilter('')}
                  disabled={props.filters.text === ''}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FormControl>
    </div>
  );
};
const mapStateToProps = (state: AppState) => {
  return {
    filters: state.filters
  };
};
const mapDispatchToProps = {
  setTextFilter
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
