import React, { Component } from "react";
import "../../styles/ImageLoader.scss";

class ImageLoader extends Component {
  _loaded = {};

  state = {
    loaded: this._loaded[this.props.src]
  };

  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded"
  };

  onLoad = () => {
    this._loaded[this.props.src] = true;
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const {
      src,
      alt,
      className,
      loadedClassName,
      loadingClassName
    } = this.props;

    let classes = `${className} ${loaded ? loadedClassName : loadingClassName}`;

    return <img src={src} alt={alt} className={classes} onLoad={this.onLoad} />;
  }
}

export default ImageLoader;
