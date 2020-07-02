import React , {useState, useEffect } from "react";
import { connect } from "react-redux";
import UploadService from "../services/upload.service";
import {RootContext} from "../App";
import {GlobalConsumer} from "../context/context";

const UploadFIles = (props) => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };


    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setFileInfos(response.data)
        });
    }, []);

    const upload = () => {
        let currentFile = selectedFiles[0];

        setProgress(0);
        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        }).then( (response) => {
            setMessage(response.data.message);
            return UploadService.getFiles();
        }).then( (files) => {
            setFileInfos(files.data);
        } )
        .catch(() => {
            setProgress(0);
            setMessage("Couldt not upload the file");
            setCurrentFile(undefined);
        });

        setSelectedFiles(undefined);
    };


    return (

                        <div>
            {currentFile && (
                <div className="progress">
                <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                >
                    {progress}%
                </div>
                </div>
            )}

            <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
            </label>

            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
            </button>

            <div className="alert alert-light" role="alert">
                {message}
            </div>

            <div className="card">
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">
                {fileInfos &&
                    fileInfos.map((file, index) => (
                    <li className="list-group-item" key={index}>
                        {console.log(file)}
                        <a target="_blank" href={file.url} >{file.name}</a>
                    </li>
                    ))}
                </ul>
            </div>

            <hr />
                    <h4>{props.state.globalcounter}</h4>
            </div>
                    
                
    );
};
// function mapStateToProps(state) {
//     return {
//         countFromGlobal : state.counter.countGlobal
//     }
// }

// export default connect(mapStateToProps)(UploadFIles)
//export default UploadFIles;
export default GlobalConsumer(UploadFIles);