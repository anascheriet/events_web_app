import React from 'react'
import "./reset.scss"

export const ResetPassword = () => {
    return (
        <div className="global">

            <div className="title">
                <h2>Reset Password</h2>
            </div>
            <div className="form">
                <form>
                    <label className="label">New Password</label>
                    <br />
                    <input type="text" name="username" className="input" />
                    <br />
                    <label className="label">Confirm New Password</label>
                    <br />
                    <input type="text" name="username" className="input" />
                    <br />
                    <button type="submit" className="submitBtn" >Confirm</button>
                </form>
            </div>
        </div>
    )
}
