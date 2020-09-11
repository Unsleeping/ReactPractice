import React, { Component } from 'react';
import Loader from '../Loader';
import ErrorIndicator from '../ErrorIndicator';

const WithData = (View) => {
  return class extends Component {
    state = {
      itemList: null,
      hasError: false
    };

    componentDidCatch() {
      this.setState({hasError: true})
    }

    update() {
      this.props.getData()
        .then((itemList) => {
          this.setState({
            itemList
          });
        });
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }
  
    componentDidMount() {
      this.update();
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
  }
};

export default WithData;