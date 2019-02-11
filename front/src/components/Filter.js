import React from 'react';
import { setFilterParam } from '../actions/filter';
import { connect } from 'react-redux';

const filters = {
  'all': 'all',
  'happiness': 'happiness',
  'surprise': 'surprise',
  'neutral': 'neutral',
  'sadness': 'sadness',
  'disgust': 'disgust',
  'anger': 'anger',
  'fear': 'fear'
};

const Filter = ({ dispatch, filter }) => (
  <select onChange={(e) => dispatch(setFilterParam(e.target.value))} value={filter}>
    {
      Object.keys(filters).map(param => (
        <option value={param} kay={param}>
          {filters[param]}
        </option>
      ))
    }
  </select>
);

function mapStateToProps(state) {
  return { filter: state.filter };
}

export default connect(mapStateToProps)(Filter);
