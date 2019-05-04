import nodemailer from 'nodemailer'
import { serviceEmailUser, serviceEmailPassword } from '../../config'
import logger from "../logger"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serviceEmailUser,
    pass: serviceEmailPassword
  }
});

/**
 * @param mailOptions
 * @returns {Promise<any>}
 */
export const sendMail = (mailOptions) => {
  if (process.env.NODE_ENV === 'test') {
    logger.info(`Not sending email (env is '${process.env.NODE_ENV}')`);
    return new Promise(resolve => resolve());
  } else {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, reply) => {
        err ? reject(err) : resolve(reply);
      });
    })
  }
}
