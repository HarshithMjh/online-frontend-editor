import React, { Component } from "react";
import { Grid, Checkbox, Button } from "@material-ui/core";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GetAppIcon from "@material-ui/icons/GetApp";
import AceEditor from "react-ace";
import DarkModeToggle from "react-dark-mode-toggle";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-chaos";

import "./App.scss";

class App extends Component {
  constructor(){
    super();
    this.state = {
      theme: "light",
      livePreview: false,
      codeForIframe: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n    <style>\n        body {\n            background-color: black;\n            text-align: center;\n            color: white;\n            font-family: Arial, Helvetica, sans-serif;\n        }\n    </style>\n</head>\n<body>\n    <h1>This is a Heading</h1>\n    <p>This is a paragraph.</p>\n    <p>Edit the code in the window to the left, and click \"Run\" to view the result.</p>\n    <img src=\"https://www.w3schools.com/tryit/avatar.png\" alt=\"Avatar\" style=\"width:200px\">\n</body>\n</html>\n",
      codeForEditor: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n    <style>\n        body {\n            background-color: black;\n            text-align: center;\n            color: white;\n            font-family: Arial, Helvetica, sans-serif;\n        }\n    </style>\n</head>\n<body>\n    <h1>This is a Heading</h1>\n    <p>This is a paragraph.</p>\n    <p>Edit the code in the window to the left, and click \"Run\" to view the result.</p>\n    <img src=\"https://www.w3schools.com/tryit/avatar.png\" alt=\"Avatar\" style=\"width:200px\">\n</body>\n</html>\n"
    };
  }

  basicHtml = "<!DOCTYPE html>\n<html>\n<head>\n    \n</head>\n<body>\n    Type here\n</body>\n</html>\n";

  handleLivePreviewChanged = () => {
    this.setState({
      livePreview: !this.state.livePreview
    });
    if(true){
      this.setState({
        codeForIframe: this.state.codeForEditor
      });
    }
  }

  handleEditorChangedCode = (newCode) => {
    this.setState({
      codeForEditor: newCode
    });
    if(this.state.livePreview){
      this.setState({
        codeForIframe: newCode
      });
    }
  }

  handleRunClicked = () => {
    this.setState({
      codeForIframe: this.state.codeForEditor
    });
  }

  handleDownloadClicked = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.codeForEditor], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "download.txt";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  handleThemeChanged = (isChecked) => {
    this.setState({
      theme: isChecked?"dark":"light"
    });
  }

  render(){
    return (
      <div className={`App ${this.state.theme}-theme`}>
        <div className="appHeader">
          <div className="livePreviewButton">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={this.handleLivePreviewChanged}
            >
              Live Preview
              <Checkbox
                checked={this.state.livePreview}
                size="small"
                className="livePreviewCheckboox"
                disableRipple={true}
                color="inherit"
              />
            </Button>
          </div>
          <div className="separator"/>
          <div className="downloadIconContainer">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={this.handleDownloadClicked}
            >
              Download
              <GetAppIcon
                className="downloadIcon"
              />
            </Button>
          </div>
          <div className="separator"/>
          <div className="runButton">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              disabled={this.state.livePreview}
              onClick={this.handleRunClicked}
            >
              Run
              <PlayCircleFilledIcon
                className="runIcon"
              />
            </Button>
          </div>
          <div className="themeToggleContainer">
            <DarkModeToggle
              onChange={this.handleThemeChanged}
              checked={this.state.theme==="dark"}
              size={45}
            />
          </div>
          <div className="separator"/>
        </div>
        <div className="appBody">
          <Grid container className="gridConatiner">
            <Grid item xs={12} lg={6} className="gridElement">
              <div className="editorContainer">
                <AceEditor
                  mode="html"
                  theme={this.state.theme==="light"?"chrome":"chaos"}
                  name="html-code-editor"
                  width="100%"
                  height="100%"
                  value={this.state.codeForEditor}
                  onChange={this.handleEditorChangedCode}
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={6} className="gridElement">
              <div className="iframeContainer">
                <iframe
                  title="editor iframe"
                  srcDoc={this.state.codeForIframe}
                  width="100%"
                  height="100%"
                  style={{
                    backgroundColor: "#fff",
                    border: "none"
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
