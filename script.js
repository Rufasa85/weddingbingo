
const grid = document.querySelector("#grid")
const clearBtn = document.querySelector("#clear");
const  startingGoals =  [
    [
        { goal: "Someone asks if you knew there were hand warmers", complete: false },
        { goal: "John makes a face about Marna", complete: false }, { goal: "Woman over 60 wears purple", complete: false }, { goal: "Parents Cry", complete: false },
        { goal: "Baskin sisters tell a story about a distant relative", complete: false }],
    [{ goal: "Someone talks about their cat", complete: false },
    { goal: "Siegel sister is last in line", complete: false },
    { goal: "Someone mentions the weather", complete: false },
    { goal: "Someone wears a scarf not around the neck", complete: false },
    { goal: "Bride or groom cry", complete: false }],
    [{ goal: "FREE SPACE", complete: true },
    { goal: "Someone brings up a horse in chat", complete: false },
    { goal: "FREE SPACE", complete: true },
    { goal: "Siegel sister tries to help bar staff", complete: false },
    { goal: "Someone asks how you are getting home", complete: false }],
    [{ goal: "Laughter during ceremony", complete: false },
    { goal: "Goodbye is said - but story is told after ", complete: false },
    { goal: "Siegel Sister is last in line", complete: false },
    { goal: "Someone explains the layers they are wearing", complete: false },
    { goal: "Someone says wish ____ were here", complete: false }],
    [{ goal: "Science reference in the wedding vows", complete: false },
    { goal: "Someone tells kevin how great the fire is", complete: false },
    { goal: "Someone mentions baby timeline", complete: false },
    { goal: "Someone mentions their wedding", complete: false },
    { goal: "Someone asks who is getting married next", complete: false }],
]

let goals = JSON.parse(localStorage.getItem("goals")) || [...startingGoals];

const setupBoard=()=>{
    grid.innerHTML=""
    goals.forEach(row => {
        const newRow = document.createElement("div");
        newRow.setAttribute("class", "row");
        grid.append(newRow);
        row.forEach(cell => {
            const newCell = document.createElement("div");
            cell.complete ? newCell.setAttribute("data-complete", "yes") : newCell.setAttribute("data-complete", "no");
            cell.complete ? newCell.setAttribute("class", "complete cell") : newCell.setAttribute("class", "incomplete cell");
            newCell.textContent = cell.goal
            newRow.append(newCell);
        })
    })
    localStorage.setItem("goals", JSON.stringify(goals))
}

setupBoard();

const updateCell = (text, val) => {
    goals.forEach(row => {
        row.forEach(cell => {
            if (cell.goal === text) {
                cell.complete = val;
            }
        })
    })
}

grid.addEventListener("click", (e) => {
    if (e.target.matches(".cell")) {
        if (e.target.getAttribute("data-complete") === "no") {
            e.target.setAttribute("data-complete", "yes")
            updateCell(e.target.textContent, true)
            e.target.setAttribute("class", "complete cell")
            localStorage.setItem("goals", JSON.stringify(goals))
        }
        else if (e.target.getAttribute("data-complete") === "yes") {
            e.target.setAttribute("data-complete", "no")
            updateCell(e.target.textContent, false)
            e.target.setAttribute("class", "incomplete cell")
            e.target.setAttribute("data-complete", "no")
            localStorage.setItem("goals", JSON.stringify(goals))
        }
    }
})

clearBtn.addEventListener("click",()=>{
    console.log("clicked clear btn")
    goals.forEach(row=>{
        row.forEach(thing=>{
            if(thing.goal!=="FREE SPACE"){
                thing.complete=false;
            }
        })
    })
    setupBoard()
})

