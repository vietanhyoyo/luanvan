
import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import {
    Button, Dialog, Box, Popper,
    Fade, Paper,
    Divider, AppBar, Toolbar, IconButton, Typography, Slide
} from '@mui/material'
import { IconPlus } from '@tabler/icons'
import CloseIcon from '@mui/icons-material/Close';
import LessonService from 'services/objects/lesson.service';
import EditLink from './EditLink';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import SubjectService from 'services/objects/subject.service';
import TeacherService from 'services/objects/teacher.service';
import VideoService from 'services/media/video.service';

// import 'draft-js/dist/Draft.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const lessonService = new LessonService();
const subjectService = new SubjectService();
const teacherService = new TeacherService();
const videoService = new VideoService();

const EditContent = (props) => {
    const [text, setText] = useState("");
    const [open, setOpen] = React.useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [gradeList, setGradeList] = useState([]);
    const [file, setFile] = useState([]);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setText("");
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            let videoPath = {path: ""};
            if (file !== []) {
                await uploadVideo(videoPath);
            }
            console.log(videoPath);
            const result = await lessonService.addLessonContent(text, props.lesson._id, videoPath.path);
            props.reLoad();
        } catch (error) {
            console.log(error)
        }
        handleClose();
    }

    const getAPI = async () => {
        try {
            const result = await lessonService.getLessonContent(props.lesson._id);
            const data = result.data;
            if (data !== "") {
                setText(data.text);
                if (data.video !== "" && data.video){
                    setFile([{name: data.video}])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(file.length)

    const getClassInCharge = async () => {
        try {
            const result = await teacherService.getClassInCharge();
            if (result.status === 200) {
                const docs = result.data;
                if (docs.classInCharge !== []) {
                    const array = docs.classInCharge.map(row => row.grade)
                    setGradeList(array)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkEdit = () => {
        if (gradeList.length === 0) return false;
        const bool1 = gradeList.includes(props.grade);
        let bool2 = true;
        if (props.lesson) {
            const idSubjectArray = subjectList.map(row => row._id);
            bool2 = idSubjectArray.includes(props.lesson.subject);
        }
        return bool1 & bool2;
    }

    const getAPISubjectList = async () => {
        try {
            const result = await subjectService.getSubjectsByTeacher();
            const docs = result.data;
            // console.log(result)
            setSubjectList(docs);
        } catch (error) {
            console.log(error);
        }
    }

    const uploadVideo = async (videoPath) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", file[0])

        try {
            const result = await videoService.upload(formData, config);
            console.log(result.data.fileName)
            videoPath.path = result.data.fileName;
            return result.data.fileName;
        } catch (error) {
            console.log(error)
            return -1;
        }
    }

    React.useEffect(() => {
        getAPI();
        getClassInCharge();
        if (subjectList.length === 0) {
            getAPISubjectList();
        }
    }, [open])

    return checkEdit() ? (<>
        <div>
            <Button
                startIcon={<IconPlus />}
                onClick={handleClickOpen}
            >Thêm nội dung bài học</Button>
            {/* <ReactQuill
                theme='snow'
                value={convertedText}
                onChange={setConvertedText}
                style={{ minHeight: '300px' }}
            />{convertedText} */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            Lưu
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box>
                    {/* <EditLink /> */}
                    <Box sx={{ margin: "2rem", height: "400px" }}>
                        <Box sx={{ marginBottom: '20px', display: 'flex' }}>
                            <Button variant="contained" component="label">
                                Tải video mp4
                                <input
                                    hidden
                                    accept="video/mp4"
                                    type="file"
                                    onChange={event => {
                                        const fileData = event.target.files;
                                        setFile(fileData);
                                    }}
                                />
                            </Button>
                            <Box sx={{ marginLeft: '10px', marginRight: '10px' }}>
                                <Typography >{file.length !== 0 ? file[0].name : ""}</Typography>
                            </Box>
                        </Box>
                        {/* <CKEditor
                            editor={ClassicEditor}
                            data={text}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                setText(data)
                            }}
                        /> */}
                        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                        {/* <video src={'http://localhost:5002'} controls></video> */}
                        <ReactQuill
                            theme='snow'
                            value={text}
                            onChange={setText}
                            style={{ minHeight: '380px', height: 'auto' }}
                            modules={modules}
                            formats={formats}
                            placeholder={propTypes.placeholder}
                        />
                    </Box>
                </Box>
            </Dialog>
        </div>
    </>
    ) : <div></div>

}

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/* 
 * PropType validation
 */
const propTypes = {
    placeholder: "Place holder",
}

export default EditContent;
