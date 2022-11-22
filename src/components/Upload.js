import React, { Component } from 'react';

class Upload extends Component {

    render() {
        return (
            <div id='upload' ref={this.props.upld} className="card col-sm-8 col-md-6 mx-auto mt-5 bg-dark p-0" style={{ borderRadius: '10px' }}>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.projectDesc.value
                    const projname = this.projname.value
                    this.props.uploadProj(description, projname)
                }} ><div className="form-group">
                        <br />
                        <input
                            id="projectDesc"
                            type="text"
                            ref={(input) => { this.projectDesc = input }}
                            className="form-control ml-auto mr-auto col-11 "
                            placeholder="Name of your Project!"
                            required />
                        <br />
                        <input
                            id="projname"
                            type="text"
                            ref={(input) => { this.projname = input }}
                            className="form-control ml-auto mr-auto col-11"
                            placeholder=" Write a description!"
                            required />
                    </div>
                    <input type="file" onChange={this.props.captureProject} className="text-white" />
                    <br /><br />
                    <button type="submit" id="file-upload-btn"><b>Upload Project</b></button>
                    <br />
                </form>
            </div>
        )
    }
}

export default Upload;