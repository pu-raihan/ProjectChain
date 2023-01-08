import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
class Projects extends Component {

    render() {
        return (
            <section className="proj center col-12" id="projchain">
                <div className="container center">
                    {this.props.projects.reverse().map((project, key) => {
                        return (
                            <div className="card col-lg-5 mb-5 m-3 p-0 projcard" style={{ maxWidth: '768px' }}>
                                <p className='ids'>ID : {project.projId}</p>
                                <div className="">
                                    <div className='p-3 col-12 '>
                                        <div className='type'>{project.projType}</div>
                                        <h4>{project.projName}</h4>
                                    </div>
                                    <div className='sizebox bg-dark col-4 float-left p-1 mb-0'> &nbsp;Project Size <br></br>{convertBytes(project.projSize)}&nbsp;</div> &nbsp;
                                    <div className='center align-top col-8 float-left mt-0' ><p className='props'>Details :</p><p> {project.projDesc}</p></div>
                                </div>
                                <div>
                                    {this.props.account===project.auther?
                                        <a
                                            href={"https://ipfs.io/ipfs/" + project.projHash}
                                            rel="noopener noreferrer"
                                            target="_blank">
                                            <button id="file-view-btn"><b>View Project</b></button></a>
                                            :<br></br>
                                    }
                                    <br />
                                    <div className='auth props float-left'>
                                        Owner : <a
                                            href={"https://etherscan.io/address/" + project.auther}
                                            rel="noopener noreferrer"
                                            target="_blank">
                                            {project.auther.substring(0, 10)}...{project.auther.substring(project.auther.length - 3, project.auther.length)}
                                        </a>
                                    </div>
                                    <div className='date props'>
                                        Date :{moment.unix(project.uploadTime).format('h:mm:ss A M/D/Y')}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default Projects;