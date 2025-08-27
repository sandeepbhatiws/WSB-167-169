import React, { useState } from 'react'
import states from '../states';

export default function Form() {

    const [getStates, setGetStates] = useState([]);

    const filterStates = (event) => {

        var finalStates = states.filter((v) => {
            if(v.country_name == event.target.value){
                return v;
            }
        })

        setGetStates([...finalStates]);
    }

    return (
        <>
            <div class="form-container">
                <h2>Basic Form</h2>
                <form id="formHandler" autocomplete="off">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" required />
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <select id="country" name="country" onChange={ filterStates } required>
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="Austraila">Austraila</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="state">State</label>
                        <select id="state" name="state" required>
                            <option value="">Select State</option>

                            {
                                getStates.map((v,i) =>{
                                    return(
                                        <option value={ v.name }>{ v.name }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
            </div>
        </>
    )
}
