import { Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import ScheduleService from "services/objects/schedule.service";

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

const scheduleService = new ScheduleService()

const ScheduleLesson = ({ scheduleID, classID, weekday, lessonNumber }) => {

    const [loading, setLoading] = useState(true);
    const [lesson, setLesson] = useState({})

    const getAPI = async () => {
        try {
            const result = await scheduleService.getScheduleLessonByNumber(scheduleID, classID, weekday, lessonNumber);
            setLesson(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            if (scheduleID !== "" && classID !== "")
                getAPI()
        } catch (error) {
            console.log(error)
        }
    }, [scheduleID, classID])

    return <>
        <BootstrapTooltip title={lesson.teacher ? lesson.teacher.name : '.'}>
            <Typography variant="body2">
                {lesson.subject ? lesson.subject.name : '.'}
            </Typography>
        </BootstrapTooltip>
    </>
}

export default ScheduleLesson