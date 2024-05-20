
import styles from './footer.module.css'
const Footer = () => {
  return (
    <div className={`${styles.footer} grid grid-cols-1 justify-center md:grid-cols-3 gap-4 py-5 px-3`}>
        <div className='text-center md:text-left'>
        <iframe width="80%" className='mx-auto' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.983938710257!2d77.03599067423146!3d28.419741493714227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229e71ef44dd%3A0x9931b80f30d32dd3!2sJMD%20Megapolis!5e0!3m2!1sen!2sin!4v1681758189341!5m2!1sen!2sin" frameBorder="0"></iframe>
        </div>
        <div>
            <span className='mb-3 block text-center md:text-left'>
            <p className='mb-1'>
            <b>Registered Address:</b>
            </p>
            <b>DHRUVA RESEARCH</b> <br />
            A237 2nd floor, JMD megapolis, Sector 48 Sohna road,
            Gurgaon, Haryana -122018
            </span>
            <span className='mb-2 block text-center md:text-left'>
                <p className='mb-1'><b>Contact Us</b></p>
                <p>Please send your queries to :</p>
                <a href="mailto:contact@dhruvresearch.com" className='text-blue-500'>contact@dhruvresearch.com</a>
            </span>
         </div>
         <div className='text-center md:text-left'>
            <span className='mb-2 block text-center md:text-left'>
            <p className='mb-1'>Copyright © 2021 DHRUVA RESEARCH. <br /> All rights reserved.</p>
            </span>
            <span className='mb-2 block'>
                <a href="privacy.html"className='text-blue-500' >Privacy Policy</a> 
            </span>
            <span className='mb-2 block'>
                <a href="icps.html" className='text-blue-500' >Indian Constitutional provisions for Surveys</a> 
            </span>
         </div>
    </div>
  )
}

export default Footer