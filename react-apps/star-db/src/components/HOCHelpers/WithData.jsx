import React, { Component } from 'react';
import './WithData.scss';
import Loader from '../Loader';
import ErrorIndicator from '../ErrorIndicator';

const WithData = (View, getData) => {
  return class extends Component {
    state = {
      itemList: null,
      hasError: false
    };

    componentDidCatch() {
      this.setState({hasError: true})
    }
  
    componentDidMount() {
      getData()
        .then((itemList) => {
          this.setState({
            itemList
          });
        });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorIndicator />;
      }

      const { itemList } = this.state;

      if (!itemList) {
        return <Loader loading={this.state.loading}/>;
      }

      return <View {...this.props} data={itemList} />;
    }
  };
};

export default WithData;