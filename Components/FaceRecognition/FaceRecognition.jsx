import { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

import Style from './FaceRecognition.module.css';
import { ST } from 'next/dist/shared/lib/utils';
import { AuthContect } from '../../Context/AuthContext';
import { Loader } from '../../Components/index';
import { Model, Error } from '../index'
import images from "../../assets";

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [Labels, setLabels] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    readStuID,
    readFname,
    readLname,
    readGender,
    readGrade,
    readCourse,
    readLevel,
    account,
    userName,
    userLists,
    getStuID,
    getFname,
    getLname,
    getGender,
    getGrade,
    getCourse,
    getLevel,
    dataLists,
    Error
  } = useContext(AuthContect);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 5000);
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      // Load face detection models from URI
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]);
      // Start the video stream and face recognition
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        videoRef.current.srcObject = stream;
        recognizeFaces();
      }).catch(error => console.error(error));
    };

    const recognizeFaces = async () => {
      const labeledDescriptors = await loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4);

      const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const label = result.label.toString();
          if (label == getStuID) {
            setLabels(true);
          }
          //console.log(label);
          const drawBox = new faceapi.draw.DrawBox(box);
          drawBox.draw(canvasRef.current);

        });
      }, 100);
    };

    const loadLabeledImages = async () => {
      const labels = [
        '66001',
        '66002',
        '66003',
        '66004',
        '66005',
        '66006',
        '66007',
        '66008',
        '66009',
        '66010',
        '66011',
        '66012',
        '66013',
        '66014',
        '66015',
        '66016',
        '66017',
        '66018',
        '66019',
        '66020',
        '66021',
        '66022',
        '66023',
        '66024',
        '66025',
        '66026',
        '66027',
        '66028',
        '66029',
        '66030',
        '66031',
        '66032',
        '66033',
        '66034',
        '66035'
      ]; // Change the label for your own images

      return Promise.all(
        labels.map(async (label) => {
          const descriptions = []
          for (let i = 1; i <= 1; i++) {
            const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            //console.log(label + i + JSON.stringify(detections));
            descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    };
    loadModels();
  }, []);

  const [formInput, setFormInput] = useState({
    address: "",
    sid: "",
    fname: "",
    lname: "",
    gender: "",
    grade: "",
    course: "",
    level: "",
  });

  return (
    <div className={Style.myapp}>

      {!Labels && (
        <div className={Style.myapp}>
          <div>
            <video ref={videoRef} autoPlay className={Style.FaceRecognition} />
          </div>
          <canvas ref={canvasRef} className={Style.appcanvas} />
        </div>
      )}
      {Labels && loading && (
        <div className={Style.FaceRecognition}>
          <div>
            <></>
          </div>
          <p>
            Student ID: {loading && <span>{getStuID}</span>}
          </p>
          <p>
            FirstName: {loading && <span>{getFname}</span>}
          </p>
          <p>
            LastName: {loading && <span>{getLname}</span>}
          </p>
          <p>
            Gender: {loading && <span>{getGender}</span>}
          </p>
          <p>
            Grade: {loading && <span>{getGrade}</span>}
          </p>
          <p>
            Course: {loading && <span>{getCourse}</span>}
          </p>
          <p>
            Level: {loading && <span>{getLevel}</span>}
          </p>
        </div>
      )}

      {/* 
      <div className={Style.FaceRecognition}>
        <video ref={videoRef} autoPlay className={Style.FaceRecognition} />
      </div>
      <canvas ref={canvasRef} className={Style.appcanvas} />

      <div className={Style.FaceRecognition}>
        <p>
          Address: <span> {account}</span>
        </p>
        <p>
          Student ID: <span> {userName}</span>
        </p>
        <p>
          FirstName: <span>{getFname}</span>
        </p>
        <p>
          LastName: <span>{formInput.lname}</span>
        </p>
        <p>
          Gender: <span>{formInput.gender}</span>
        </p>
        <p>
          Grade: <span>{formInput.grade}</span>
        </p>
        <p>
          Course: <span>{formInput.course}</span>
        </p>
        <p>
          Level: <span>{formInput.level}</span>
        </p>
      </div> */}

    </div>
  );
};

export default FaceRecognition;