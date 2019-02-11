import React, { Component } from 'react';
import Masonry from './Masonry';
import Filter from './Filter';
import Tile from './Tile';
import { getPhotos } from '../actions/photos';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPhotos('/photos'));
  }

  render() {
    const { photos, filter } = this.props;
    return (
      <div className="App">
        <div className="container">
  				<div className="masonry-container">
            <div className="filter">
              <span>Show emotions: </span>
              <Filter />
            </div>
  					<p>#INT20H Gallery</p>
            {
              photos.length !== 0
              ? ( <Masonry brakePoints={ [350, 500, 750] }>
      						{ photos
                    .filter(photo => (
                      filter === 'all' ? true : photo.emotions.includes(filter)
                    ))
                    .map((image, id) => (
                      <Tile src={image.url} key={image.image_id} />
        						))
                  }
      					</Masonry> )
              : (<h2>Loading...</h2>)
            }
  				</div>
  			</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { photos, filter } = state;

  return {
    photos,
    filter
  };
}

export default connect(mapStateToProps)(App);
