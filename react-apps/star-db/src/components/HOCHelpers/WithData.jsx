import React, { Component } from 'react';
import Loader from '../Loader';
import ErrorIndicator from '../ErrorIndicator';

const WithData = (View) => {
  return class extends Component {
    state = {
      itemList: null,
      hasError: false,
      loading: true
    };

    componentDidCatch() {
      this.setState({hasError: true})
    }

    update() {
      this.setState({ loading: true, hasError: false });

      this.props.getData()
        .then((itemList) => {
          this.setState({
            itemList,
            loading: false
          });
        })
        .catch(() => {
          this.setState({ hasError: true, loading: false })
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
      const { itemList, loading, hasError} = this.state;

      if (hasError) {
        return <ErrorIndicator />;
      }

      if (loading) {
        return <Loader loading={this.state.loading}/>;
      }

      return <View {...this.props} data={itemList} />;
    }
  }
};

export default WithData;