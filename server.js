const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files (CSS, JS)
app.use(express.static('public'));

// Route to generate the button screen
app.get('/button-screen', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Button Screen</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100vh;
                justify-content: space-between;
            }

            /* Top horizontal buttons - 三个按钮水平排列（横着一排）*/
            .top-button-container {
                display: flex;
                flex-direction: row;  /* 水平排列 */
                justify-content: stretch;  /* 拉伸填满宽度 */
                padding: 10px;
                gap: 0;  /* 无间隙 */
            }

            .horizontal-button {
                flex: 1;  /* 每个按钮等宽 */
                padding: 15px;
                border: none;
                border-radius: 0;  /* 移除圆角 */
                color: white;
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                transition: opacity 0.2s;
            }

            .horizontal-button:hover {
                opacity: 0.8;
            }

            .blue-button {
                background-color: #2196F3;
            }

            .red-button {
                background-color: #F44336;
            }

            .green-button {
                background-color: #4CAF50;
            }

            /* Middle text */
            .middle-text-container {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .middle-text {
                font-size: 18px;
                color: #333;
                text-align: center;
            }

            /* Bottom vertical buttons - 三个按钮垂直排列（竖着排列）*/
            .bottom-button-container {
                display: flex;
                flex-direction: column;  /* 确保垂直排列 */
                align-items: center;
                padding: 10px;
                gap: 5px;
            }

            .vertical-button {
                width: 80%;
                padding: 15px;
                border: none;
                border-radius: 5px;  /* 底部按钮保持圆角 */
                color: white;
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                transition: opacity 0.2s;
                margin: 2px 0;  /* 垂直间距 */
            }

            .vertical-button:hover {
                opacity: 0.8;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .horizontal-button {
                    font-size: 12px;
                    padding: 12px;
                }
                
                .middle-text {
                    font-size: 16px;
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Top Row - 3 Horizontal Buttons -->
            <div class="top-button-container">
                <button class="horizontal-button blue-button" onclick="handleButtonPress('Blue')">
                    BLUE BUTTON
                </button>
                <button class="horizontal-button red-button" onclick="handleButtonPress('Red')">
                    RED BUTTON
                </button>
                <button class="horizontal-button green-button" onclick="handleButtonPress('Green')">
                    GREEN BUTTON
                </button>
            </div>

            <!-- Middle Text -->
            <div class="middle-text-container">
                <div class="middle-text">Write the code for this screen</div>
            </div>

            <!-- Bottom Row - 3 Vertical Buttons -->
            <div class="bottom-button-container">
                <button class="vertical-button blue-button" onclick="handleButtonPress('Blue')">
                    BLUE BUTTON
                </button>
                <button class="vertical-button red-button" onclick="handleButtonPress('Red')">
                    RED BUTTON
                </button>
                <button class="vertical-button green-button" onclick="handleButtonPress('Green')">
                    GREEN BUTTON
                </button>
            </div>
        </div>

        <script>
            function handleButtonPress(color) {
                console.log(\`\${color} button pressed\`);
                // You can also show an alert or update the UI
                // alert(\`\${color} button pressed!\`);
                
                // Example: Change middle text temporarily
                const middleText = document.querySelector('.middle-text');
                const originalText = middleText.textContent;
                middleText.textContent = \`\${color} button was pressed!\`;
                
                setTimeout(() => {
                    middleText.textContent = originalText;
                }, 1500);
            }
        </script>
    </body>
    </html>
  `;
  
  res.send(html);
});

// Alternative API endpoint that returns JSON data
app.get('/api/button-screen-data', (req, res) => {
  res.json({
    title: "Button Screen",
    buttons: [
      { id: 1, text: "BLUE BUTTON", color: "blue", bgColor: "#2196F3" },
      { id: 2, text: "RED BUTTON", color: "red", bgColor: "#F44336" },
      { id: 3, text: "GREEN BUTTON", color: "green", bgColor: "#4CAF50" }
    ],
    middleText: "Write the code for this screen"
  });
});

// Handle button press via POST request
app.use(express.json());
app.post('/api/button-press', (req, res) => {
  const { color } = req.body;
  console.log(`Server received: ${color} button pressed`);
  
  res.json({
    success: true,
    message: `${color} button press received`,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Visit http://localhost:${port}/button-screen to see the screen`);
  console.log(`Visit http://localhost:${port}/api/button-screen-data for JSON data`);
});

module.exports = app;