import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import NewsService from 'services/objects/news.service';

const newsService = new NewsService()

const AddNews = () => {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const result = await newsService.addNews(text)
            handleClose()
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    return <><Button variant="text"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}>
        Tạo bản tin
    </Button>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {"Thêm mới một bản tin"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ paddingTop: '20px', width: 500, display: 'flex', justifyContent: 'space-between' }}>
                    <ReactQuill
                        theme='snow'
                        value={text}
                        onChange={setText}
                        style={{ height: '100%' }}
                        modules={modules}
                        formats={formats}
                        placeholder={propTypes.placeholder}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button autoFocus onClick={handleSubmit}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    </>
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

export default AddNews