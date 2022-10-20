import MainCard from "ui-component/cards/MainCard";
import { Switch, FormControl, FormGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useState, useEffect } from 'react'
import ManagementService from "services/objects/management.service";

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const managementService = new ManagementService();

const ManageUpdate = () => {

    const [status, setStatus] = useState(false)

    const handleChange = event => {
        setStatus(event.target.checked)
        changeStatus(event.target.checked)
    }

    const getAPI = async () => {
        try {
            const result = await managementService.get();
            const learnStatus = result.data.learnStatus;
            setStatus(learnStatus === 'online' ? true : false);
        } catch (error) {
            console.log(error)
        }
    }

    const changeStatus = async (status) => {
        try {
            await managementService.change(status);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    return <>
        <MainCard title="Thay đổi trạng thái dạy học">
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Chuyển sang trạng thái học online hay offline</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch {...label} checked={status} onChange={handleChange} />}
                        label={status ? "Online" : "Offline"}
                    />
                </FormGroup>
            </FormControl>
        </MainCard>
    </>
}

export default ManageUpdate;