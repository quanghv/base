import React from "react";
import { connect } from "react-redux";
import MainStack from "./containers/Router";

// const envDev = true;

class Main extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "Main");
  }

  render() {
    // console.log(this.props, "Main props");
    return (
      <MainStack
        ref={nav => {
          this.navigator = nav;
        }}
        screenProps={"this.props.orderBadge"}
      />
    );
  }
}
const mapStateToProps = state => ({
  orderBadge: state.orderBadgeReducer
});
export default connect(mapStateToProps)(Main);
