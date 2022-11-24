import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
class Block extends Component {

    render() {
        return (
            <section className="proj center col-12" id="projchain">
                <div className="container center">
                    {this.props.chain.map((block, key) => {
                        return (
                            <div className="card col-lg-5 mb-5 m-3 p-0 projcard" style={{ maxWidth: '768px' }}>
                                <p className='ids '>Block Id : {block.blockId}</p>
                                <div className=" text-left">
                                    <div className=' col-8 p-0'>
                                        <p className='sizebox pl-3 ml-0 color1'>{this.props.projects[block.proj1 - 1].projName}</p>
                                        <p className='sizebox pl-3 ml-0 color1'>{this.props.projects[block.proj2 - 1].projName}</p>
                                        <p className='sizebox pl-3 ml-0 color1'>{this.props.projects[block.proj3 - 1].projName}</p>
                                    </div>
                                    <div className='col-12 text-center bg-dark p-1 mb-0'> &nbsp;Block Hash <br></br><p className='props font-xs'>{block.blockHash}</p></div> 
                                    <br></br>
                                    <div className='type text-center'><p className=' font-xs'>&nbsp;Previous Hash <br>
                                    </br>{block.preHash}&nbsp;</p></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default Block;