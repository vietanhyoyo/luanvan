import { useEffect, useState } from "react";
import ScheduleService from "services/objects/schedule.service";

const scheduleService = new ScheduleService()

const ScheduleLesson = ({ scheduleID, classID, weekday, lessonNumber }) => {

    const [loading, setLoading] = useState(true);
    const [lesson, setLesson] = useState({})

    const getAPI = async () => {
        try {
            const result = await scheduleService.getScheduleLessonByNumber(scheduleID, classID, weekday, lessonNumber);
            console.log(result)
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
        <p>{lesson.subject ? lesson.subject.name : '.'}</p>
    </>
}

export default ScheduleLesson