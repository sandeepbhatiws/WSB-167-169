var states = [
    {id: 1, name: 'Maharashtra',country_name: 'India'},
    {id: 2, name: 'Karnataka',country_name: 'India'},
    {id: 3, name: 'Tamil Nadu',country_name: 'India'},
    {id: 4, name: 'West Bengal',country_name: 'India'},
    {id: 5, name: 'Gujarat',country_name: 'India'},
    {id: 6, name: 'Ontario',country_name: 'Canada'},
    {id: 7, name: 'Quebec',country_name: 'Canada'},
    {id: 8, name: 'British Columbia',country_name: 'Canada'},
    {id: 9, name: 'Alberta',country_name: 'Canada'},
    {id: 10, name: 'Manitoba',country_name: 'Canada'},
    {id: 11, name: 'New South Wales',country_name: 'Austraila'},
    {id: 12, name: 'Victoria',country_name: 'Austraila'},
    {id: 13, name: 'Queensland',country_name: 'Austraila'},
    {id: 14, name: 'Western Australia',country_name: 'Austraila'},
    {id: 15, name: 'South Australia',country_name: 'Austraila'}
];

document.getElementById('country').addEventListener('change', (country_name) => {
    var filterStates = states.filter((value) => {
        if(country_name.target.value == value.country_name){
            return value;
        }
    })

    var statesText = '<option value="">Select State</option>';

    filterStates.forEach((value) => {
        statesText += '<option value="'+ value.name +'">'+ value.name +'</option>';
    })

    document.getElementById('state').innerHTML = statesText;
});


var userInfos = [];


function displayUser(userInfos){
    if(userInfos.length > 0){
        userDisplay = '';
        userInfos.forEach((value, index) => {

            console.log(value);

            userDisplay += `<tr>
                                <td>${ index+1 }</td>
                                <td>${ value.name }</td>
                                <td>${ value.email }</td>
                                <td>${ value.mobile_number }</td>
                                <td>${ value.country_name }</td>
                                <td>${ value.state_name }</td>
                                <td><button onclick="deleteUser(${ index })" > Delete </button></td>
                            </tr>`
        })

        document.getElementById('fetch-data').innerHTML = userDisplay;
    } else {
        var userData = `
            <tr>
                <td colspan="7">No Record Found !!</td>
            </tr>
        `;

        document.getElementById('fetch-data').innerHTML = userData;
    }
}

displayUser(userInfos);

document.getElementById('formHandler').addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        name : e.target.name.value,
        email : e.target.email.value,
        mobile_number : e.target.mobile.value,
        country_name : e.target.country.value,
        state_name : e.target.state.value
    }

    userInfos = [user, ...userInfos ];
    displayUser(userInfos);

    e.target.reset();

    var statesText = '<option value="">Select State</option>';
    document.getElementById('state').innerHTML = statesText;
});


function deleteUser(index){
    console.log(index);
    userInfos.splice(index,1)
    displayUser(userInfos);
}