
const head = `
<head>
    <style>

    * {
        font-size: 40px;
    }
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        outline: none;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      html { overflow-y: scroll; }
      body { 
        background: #eee url('https://i.imgur.com/eeQeRmk.png'); /* https://subtlepatterns.com/weave/ */
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 60%;
        line-height: 1;
        color: #585858;
        padding: 22px 10px;
        padding-bottom: 55px;
      }
      
      ::selection { background: #5f74a0; color: #fff; }
      ::-moz-selection { background: #5f74a0; color: #fff; }
      ::-webkit-selection { background: #5f74a0; color: #fff; }
      
      br { display: block; line-height: 1.6em; } 
      
      article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; }
      ol, ul { list-style: none; }
      
      blockquote, q { quotes: none; }
      blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; }
      strong, b { font-weight: bold; } 
      
      table { border-collapse: collapse; border-spacing: 0; }
      img { border: 0; max-width: 100%; }
      
      h1 { 
        font-family: 'Amarante', Tahoma, sans-serif;
        font-weight: bold;
        font-size: 3.2em;
        line-height: 1.7em;
        margin-bottom: 10px;
        text-align: center;
      }
      
      
      /** page structure **/
      #wrapper {
        display: block;
        width: 850px;
        background: #fff;
        margin: 0 auto;
        padding: 10px 17px;
        -webkit-box-shadow: 2px 2px 3px -1px rgba(0,0,0,0.35);
      }
      
      #keywords {
        margin: 0 auto;
        font-size: 1.2em;
        margin-bottom: 15px;
      }
      
      
      #keywords thead {
        cursor: pointer;
        background: #c9dff0;
      }
      #keywords thead tr th { 
        font-weight: bold;
        padding: 12px 30px;
        padding-left: 42px;
      }
      #keywords thead tr th span { 
        padding-right: 20px;
        background-repeat: no-repeat;
        background-position: 100% 100%;
      }
      
      #keywords thead tr th.headerSortUp, #keywords thead tr th.headerSortDown {
        background: #acc8dd;
      }
      
      #keywords thead tr th.headerSortUp span {
        background-image: url('https://i.imgur.com/SP99ZPJ.png');
      }
      #keywords thead tr th.headerSortDown span {
        background-image: url('https://i.imgur.com/RkA9MBo.png');
      }
      
      
      #keywords tbody tr { 
        color: #555;
      }
      #keywords tbody tr td {
        text-align: center;
        padding: 15px 10px;
      }
      #keywords tbody tr td.lalign {
        text-align: left;
      }

      table, th, td {
        border:1px solid black;
      }

    </style>
</head> `


const mock_body = (data) => {
    const body1 = `
        <body>
        <div id="wrapper">
        <h1>Relatório de fênomenos</h1>
        
        <table id="keywords">
            <thead>
            <tr>
                <th><span>Estado</span></th>
                <th><span>Fenômenos registrados</span></th>
                <th><span>Total de ocorrências</span></th>
            </tr>
            </thead>
    `
    const body2 = `
        <tbody>
    `
    let body3 = `
    `

    let estado 
    Object.keys(data).forEach(item => {
        Object.keys(data[item]).forEach((key, index) => {
            if(index === 0){
                estado = data[item][key]
                body3 = body3 + `
                    <tr>
                    <td>${data[item][key]}</td>
                    <td>------------</td>
                `
            }else if(index === 1) {
                body3 = body3 + `
                    <td>${data[item][key]}</td>
                    <tr>
                `
            }else{
                body3 = body3 + `
                <tr>
                    <td>${estado}</td>
                    <td>${key}</td>
                    <td>${data[item][key]}</td>
                </tr>
                `
            }
        })
    })

    const body4 = `
        </tbody>
    `

    const body5 = `
        </table>
        </div> 
        </body>
    `

    return body1+body2+body3+body4+body5
}


module.exports = (data) => {
    return head + mock_body(data) 
}
