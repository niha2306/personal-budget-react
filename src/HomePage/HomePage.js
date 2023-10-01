import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

const HomePage = () => {
    let mypieChart;
    let dataD3;
    let dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    '#67bf7d',
                    '#e0891d',
                    '#e01dd3',
                    '#6b5f6b'
                ]
            }
        ],
        labels: []
    }

    const createChart = () => {
        if (mypieChart) mypieChart.destroy();
        mypieChart = new Chart("mypieChart", {
            type: 'pie',
            data: dataSource
        });
    }

    useEffect( () => {
        axios.get('http://localhost:3001/budget')
        .then(function(res){
            for (var i = 0; i < res.data.mybudget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.mybudget[i].budget;
                dataSource.labels[i] = res.data.mybudget[i].title;
                dataD3 = res.data.mybudget;
            }
            createChart();
            createD3Chart();
        })
    }, [])
    const createD3Chart = () => {
        const width = 950;
        const height = 500;
        const  radius = Math.min(width, height) / 2 - 50;
        d3.selectAll('svg').remove();
        let svg = d3.select("div#d3Chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + height / 2 + ")"
        );
    
        const colors = d3.scaleOrdinal()
        .domain(dataD3.map((d) => d.title.toString()))
        .range([
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#67bf7d',
          '#e0891d',
          '#e01dd3',
          '#6b5f6b'
        ]);
    
        const pie = d3.pie().value((d) => Number(d.budget));
    
        svg
        .selectAll('pieces')
        .data(pie(dataD3))
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', (d, i) => (colors(i)))
        .attr("stroke", "#121926")
        .style("stroke-width", "1px");
    
        const labelLocation = d3.arc()
          .innerRadius(100)
          .outerRadius(radius);
    
        
        svg
          .selectAll('pieces')
          .data(pie(dataD3))
          .enter()
          .append('text')
          .text((d, i) => (dataD3[i].title+ "- $"+ dataD3[i].budget))
          .attr("transform", (d) => "translate(" + labelLocation.centroid(d) + ")")
          .style("text-anchor", "middle")
          .style("font-size", 15);
    }
    return (
      <main className="container center" id="main">

          <div className="page-area">

              <div className="text-box">
                  <h1>Stay on track</h1>
                  <p>
                      Do you know where you are spending your money? If you really stop to track it down,
                      you would get surprised! Proper budget management depends on real data... and this
                      app will help you with that!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Alerts</h1>
                  <p>
                      What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Results</h1>
                  <p>
                      People who stick to a financial plan, budgeting every expense, get out of debt faster!
                      Also, they to live happier lives... since they expend without guilt or fear... 
                      because they know it is all good and accounted for.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Free</h1>
                  <p>
                      This app is free!!! And you are the only one holding your data!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Stay on track</h1>
                  <p>
                      Do you know where you are spending your money? If you really stop to track it down,
                      you would get surprised! Proper budget management depends on real data... and this
                      app will help you with that!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Alerts</h1>
                  <p>
                      What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Results</h1>
                  <p>
                      People who stick to a financial plan, budgeting every expense, get out of debt faster!
                      Also, they to live happier lives... since they expend without guilt or fear... 
                      because they know it is all good and accounted for.
                  </p>
              </div>

          </div>
          <div className="budgetChart">
              <div>
                  <h1>BUDGET Chart(ChartJS)</h1>
                  <p>
                      <canvas id="mypieChart" width="400" height="400">{mypieChart}</canvas>
                  </p>
              </div>

              <div id="d3Chart">
                  <h1>BUDGET CHART(D3JS)</h1>
              </div>
          </div>
      </main>
      
    )
}

export default HomePage