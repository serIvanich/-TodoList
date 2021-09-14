import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {FormikHelpers, useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reduser";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Redirect} from "react-router-dom";
import {selectorLoggedIn} from "../../app/App";

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectorLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 2) {
                errors.password = 'password may be biggest 2 simbol'
            }
            return errors;
        },

        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }


            // formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            // name='password'
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.password}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

