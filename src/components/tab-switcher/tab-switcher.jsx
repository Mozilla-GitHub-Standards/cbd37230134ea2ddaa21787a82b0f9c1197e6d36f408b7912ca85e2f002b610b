import React from "react";
import PropTypes from "prop-types";

// Children nodes and buttons can be hidden if empty based on hidden param passed to them.
// TODO: find a way to allow another tab to be active by default, especially if it's the only tab with content/not hidden

export default class TabSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.tabClick = this.tabClick.bind(this);
    this.state = {
      activeTab: this.getSlugIndex(this.props.initialTab)
    };
  }
  getSlugIndex(slug) {
    let slugIndex = 0; // Default to first tab

    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.slug === slug) {
        slugIndex = i;
        break;
      }
    }

    return slugIndex;
  }
  tabClick(index) {
    this.setState({activeTab: index});

    if (this.props.onChange) {
      this.props.onChange({
        index: index,
        tabName: this.props.children[index].props.name,
        slug: this.props.children[index].props.slug
      });
    }
  }
  render() {
    let buttons = this.props.children.map((element, index) => {
      if(this.props.children[index].props.hidden) { return; }

      return (
        <button
          className={`mui-btn ${index === this.state.activeTab ? `mui-active` : ``}`}
          onClick={this.tabClick.bind(null, index)}
          key={element.props.slug}
          hidden={this.props.children[index].props.hidden}>
          <img className="mui-icon" src={index === this.state.activeTab && element.props.iconActive ? element.props.iconActive : element.props.iconDefault}/>
          <span className="mui-name">{element.props.name}</span>
        </button>
      );
    });

    // Remove undefined values from buttons
    buttons = buttons.filter(Boolean);

    let panels = this.props.children.map((element, index) => {
      return (
        <div
          className={`mui-panel ${index === this.state.activeTab ? `mui-active` : ``}`}
          key={index}>
          {element}
        </div>
      );
    });

    return (
      <div className={`mui-tab-switcher${this.props.className ? ` ${this.props.className}` : ``}`}>
        <div className="mui-tabs" hidden={buttons.length < 2}>{buttons}</div>
        <div className="mui-panels">{panels}</div>
      </div>
    );
  }
}

TabSwitcher.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onChange: PropTypes.func
};
