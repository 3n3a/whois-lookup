import "./styles.css";

import moment from "moment"
moment().format();


let app = document.getElementById('app')

function h(htag, text, e=app) {
    e.insertAdjacentHTML('beforeend', `<h${htag}>${text}</h${htag}>`)
}

function btn(name, callback, e=app) {
    e.insertAdjacentHTML('beforeend', `<button id="${name}-btn">${name}</button>`)
    document.getElementById(`${name}-btn`).addEventListener('click', () => {
        callback()
    })
}

function input(name, description, placeholder, e=app) {
    e.insertAdjacentHTML('beforeend', `<label for="${name}" >${description}</label>`)
    e.insertAdjacentHTML('beforeend', `<input type="text" name="${name}" value="${placeholder}" id="${name}" required></button>`)
}

function div(classes, e=app) {
    let id_ = Math.random().toString(36).substring(2,7);
    app.insertAdjacentHTML('beforeend', `<div class="${classes}" id="${id_}"></div>`)
    return document.getElementById(id_)
}

function calc_working_time(start_time_id, end_time_id, break_time_id) {
    let input_time_format = "hh:mm"
    let time1 = moment(document.getElementById(start_time_id).value, input_time_format)
    let time2 = moment(document.getElementById(end_time_id).value, input_time_format)

    let break_ = Number(document.getElementById(break_time_id).value)
    let time2_diff = time2.subtract(break_, 'minutes')

    let total_time = time2_diff.diff(time1, 'hours',true)
    let rounded_total_time = total_time.toFixed(2)
    return rounded_total_time
}

let d = div("container")
h(1, "Calculate your working Hours", d)
input("time1", "Enter Starting Time", "8:00", d)
input("time2", "Enter Ending Time", "17:00", d)
input("break", "Enter Breaktime (mins)", "45", d)
btn("Calculate Working Time", function () {
    let working_time = calc_working_time('time1', 'time2', 'break')
    alert(`${working_time} hours`)
}, d)