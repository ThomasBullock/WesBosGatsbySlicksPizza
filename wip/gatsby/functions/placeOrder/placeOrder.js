const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
    return `<div>
        <h2>Your Recent Order for ${total}</h2>
        <p>Please start walking over, we will have your order ready in the next 20mins.</p>
        <ul>
        ${order.map(
            (item) => `<li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
        </li>`
        )}
        </ul>
        <p>Your total is <strong>${total}</strong> due at pickup.</p>
        <style>
            ul {
                list-style: none
            }
        </style>
    </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

exports.handler = async (event, context) => {
    // await wait(5000);
    const body = JSON.parse(event.body);
    // Validate teh datq coming in si correct
    const requiredFields = ["email", "name", "order"];

    for (const field of requiredFields) {
        console.log(`Checking that ${field} is goood`);
        if (!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Ooops! You are missing the ${field} field`,
                }),
            };
        }
    }

    // make sure they actually have itemns in the order
    if (!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Why would you order nothing?!`,
            }),
        };
    }

    // send the email

    // send succes or error

    // Test send an email
    const info = await transporter.sendMail({
        from: "Slick's Slices <slick@example.com>",
        to: `${body.name} <${body.email}>, orders@example.com`,
        subject: "New Order",
        html: generateOrderEmail({ order: body.order, total: body.total }),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success" }),
    };
};
