import gsap from 'gsap'




export function highlightLevel( levelArray, highlightUUID ){
    levelArray.forEach(el => {
        if( el.uuid == highlightUUID){
            gsap.to( el.position, {
                x: el.userData.initialPos.x, 
                y: .8, 
                z: -.4, 
                duration: 1
            });
        }else{
            gsap.to( el.position, { 
                x: el.userData.initialPos.x, 
                y: el.userData.initialPos.y,
                z: el.userData.initialPos.z,
                duration: 1
            }); 
        }
    });
}

export function showLayoutView( levelArray ){
    levelArray.forEach( (el, index) => {
        gsap.to( el.position, { 
            x: el.userData.initialPos.x,
            y: el.userData.initialPos.y, 
            z: el.userData.initialPos.z + index*.8, 
            duration: 1
        });
    });
}

export function liftLevels( levelArray ){
    levelArray.forEach(el => {
        gsap.to( el.position, { 
            y: (el.userData.initialPos.y * 3) + .25, 
            x: el.userData.initialPos.x, 
            z: el.userData.initialPos.z, 
            duration: 1
        });
    });
}

export function showRooms( roomArray ){
    roomArray.forEach(el => {
        el.visible = true;
    });
}

export function hideRooms( roomArray ){
    roomArray.forEach(el => {
        el.visible = false;
    });
}

export function resetPositions( levelArray ){
    levelArray.forEach(el => {
        gsap.to( el.position, { 
            x: el.userData.initialPos.x, 
            y: el.userData.initialPos.y,
            z: el.userData.initialPos.z,
            duration: 1
        });
    });
}

export function recursiveAddShadow(three_obj, shadowBool){
    if(three_obj.hasOwnProperty('castShadow')){
        three_obj.castShadow = shadowBool;
    }
    if(three_obj.hasOwnProperty('receiveShadow')){
        three_obj.receiveShadow = shadowBool;
    }
    if ( three_obj.hasOwnProperty('children') && three_obj.children.length > 0 ){ 
        three_obj.children.forEach(element => {
            recursiveAddShadow(element, shadowBool);
        }); 
    }
}

export function addNavPanel( domID, projectName ){
    document.getElementById(domID).innerHTML=
    `
    <div class="card bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header">
            <h6 class="d-inline mb-0">
                ${projectName} project&nbsp;
            </h6>
            <small>
                <a class="nav-link d-inline p-0" href="/examples/${projectName.toLowerCase()}/src/script.js">
                    (src)
                </a>
            </small>
        </div>
        <div class="card-body py-2">
            <a class="nav-link p-0" href="/">
                &#60;&#60; back
            </a>
        </div>
    </div>
    `;
}