import React from 'react'


class CaseWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      type: props.type,
      icon: props.icon,
      header: props.header,
      property: props.property,
      initialized: false
    };
  }

  componentDidUpdate() {
    if (this.state.initialized === false && this.props.value.isFetching === false) {
      this.setState({ value: Reflect.get(this.props.value.statistics, this.state.property), initialized: true })
    }
  }

  render() {
    const { value, type, icon, header } = this.state;
    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className={"card border-left-" + type + " shadow h-100 py-2"}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className={"text-xs font-weight-bold text-" + type + " text-uppercase mb-1"}>{header}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
              </div>
              <div className="col-auto">
                <i className={"fas fa-" + icon + " fa-2x text-gray-300"}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CaseWidget;
