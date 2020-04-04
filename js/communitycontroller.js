$(document).ready(() => {
    refreshToken()
    getcommunitys()
})

access = JSON.parse(localStorage.getItem('access_token'));
tosend = `Bearer ${access}`;

let refreshToken = () => {
    try {
        let token_refresh = JSON.parse(localStorage.getItem('refresh_token'));        
        if(token_refresh === null){
            window.location.href='/login.html';
        } else {
            axios.post('https://hoodnewss.herokuapp.com.com/api/v1/token/refresh/',{
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                refresh: token_refresh,
            })
            .then((res) => {
                new_access_token = JSON.stringify(res.data.access);
                localStorage.setItem('access_token', new_access_token)
            })
        }
    }
    catch(err) {
        console.log(err)
        window.location.href='/register.html';
    }
}

let joincommunitys = (community, user) => {
    try {
        fetch('https://hoodnewss.herokuapp.com.com/api/v1/join/' + community + '/' + user, {
            method: 'PUT',
            headers: {
                'Authorization': tosend
            }
        })
        .then((res) => {
            if(res.status === 500){
                window.location.href = 'update_profile.html'
            } else {
                window.location.href = 'community.html';
            }
        })
        .catch((err) => {
            window.location.href = 'login.html';
        })
    }
    catch(err){
        window.location.href = 'login.html';
    }
}


let getcommunitys = () => {
    try{
        fetch('https://hoodnewss.herokuapp.com.com/api/v1/communitys/', {
            method: 'GET',
            headers: {
                'Authorization': tosend
            }
        })
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2 class="text-center">Community</h2>';
            data.forEach((community) => {
                usercommunity = community.community_name
                if(community.admin === null){
                    community.admin = 'Your Community has no community'
                }
                output += `
                <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;" />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title" id='communityname'>${community.community_name}</h5>
                                <small class="card-subtitle mb-2 text-muted">${community.location}</small>
                                </br> </br>
                                <p class="card-text">
                                    Number of occupants: ${community.occupants_count} </br>
                                    ${community.admin}
                                </p>
                                <a id='communityjoin' class="card-link text-primary">Join Community</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });

            document.getElementById('communitylist').innerHTML = output;
            document.getElementById('communityjoin').addEventListener('click', () => {
                communityname  = document.getElementById('communityname').innerHTML;
                username = localStorage.getItem('username')
                joincommunitys(communityname, username)
            });
        })
        .catch((err) => 
        {
            window.location.href = 'login.html';
        })
    }
    catch(err){
        window.location.href = 'login.html';
    }
}