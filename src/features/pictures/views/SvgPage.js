export const SvgPage = () => {

    return (
        <div>
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" strokeWidth= "4" fill="yellow" />
            </svg>
            <svg width="400" height="100">
                <defs>
                    <filter id="f1" x="0" y="0">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={15}></feGaussianBlur>
                    </filter>
                </defs>
                <rect width="400" height="100" filter="url(#f1)"style={{fill: "rgb(0,0,255)", strokeWidth:10, stroke: "rgb(0,0,0)"}} />
            </svg>
            <br />
            <svg width="400" height="180">
                <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
                style={{fill: "red", stroke: "black", strokeWidth: 5, opacity: 0.5}} /> 
            </svg>
            <svg width="300" height="200" >
                <polygon points="100,10 40,198 190,78 10,78 190,200" 
                style={{ fill: "lime", stroke: "purple", strokeWidth: 5, fillRule: "evenodd"}} />
            </svg>
            <br />
            <svg height="150" width="500">
                <ellipse cx="200" cy="80" rx="100" ry="50"
                style={{ fill: "yellow", stroke: "purple", strokeWidth: 2 }}></ellipse>
            </svg>
            <br />
            <svg width="500" height="250" >
                <ellipse cx="250" cy="125" rx="150" ry="100" style={{ fill: "lime"}} />
                <ellipse cx="250" cy="125" rx="100" ry="66.66" style={{ fill: "purple"}} />
            </svg>
            <br />
            <svg width="500" height="250">
                <polygon points="250,10  350,180 100,80 400,80,  150,180" 
                style={{ fill: "lime", stroke: "purple", strokeWidth: 5, fillRule: "evenodd"}} />
            </svg>
            <br />
            <svg width="400" height="300">
                <text x="40" y="50" fill="rgb(220,0,230)" transform="rotate(30 20,40)" fontSize={30}>I love SVG, 
                    <tspan x="40" y="80">because, you can</tspan>
                    <tspan x="40" y="120">write in multiple lines</tspan>
                </text>
            </svg>
        </div>
    )
}