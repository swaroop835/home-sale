import React from "react";
import logo from "../../logo.png";
import './Terms.css';

function Terms() {
  return (
    <div className="terms-container">
      <ol className="terms-list">
        <li>
          <b>Introduction</b>
        </li>
        <p className="terms-text">
          These Terms and Conditions ("Terms") govern your access and use of "Dream Homes", a website operated by our company. By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access or use the Website.
        </p>
        <li>
          <b>Use of Website</b>
        </li>
        <div className="terms-section">
          <ul className="terms-ul">
            <li>You may use the Website only for lawful purposes and in accordance with these Terms.</li>
            <li>You agree not to use the Website in any way that could damage, disable, overburden, or impair the Website or interfere with any other user's use of the Website.</li>
            <li>You agree not to use the Website to upload or post any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, hateful, or racially or ethnically offensive.</li>
            <li>You are solely responsible for any content you upload or post to the Website.</li>
          </ul>
        </div>
        <li>
          <b>Intellectual Property</b>
        </li>
        <div className="terms-section">
          <ul className="terms-ul">
            <li>The Website and its content, including but not limited to text, graphics, logos, images, and software, are the property of the Company or its licensors and are protected by copyright, trademark, and other intellectual property laws.</li>
            <li>You may not reproduce, modify, distribute, transmit, display, sell, create derivative works from, or otherwise exploit any content on the Website without the prior written consent of the Company.</li>
          </ul>
        </div>
        <li>
          <b>Disclaimers</b>
        </li>
        <div className="terms-section">
          <ul className="terms-ul">
            <li>The Website is provided "as is" and without warranties of any kind, express or implied.</li>
            <li>The Company disclaims all warranties, including but not limited to, the warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
            <li>The Company does not warrant that the Website will be uninterrupted or error-free, that defects will be corrected, or that the Website or the server that makes it available are free of viruses or other harmful components.</li>
          </ul>
        </div>
        <li>
          <b>Limitation of Liability</b>
        </li>
        <p className="terms-text">
          The Company shall not be liable for any damages arising from your use of the Website, including but not limited to, direct, indirect, incidental, consequential, and punitive damages.
        </p>
        <li>
          <b>Third-Party Content</b>
        </li>
        <p className="terms-text">
          The Website may contain links to third-party websites or resources. The Company is not responsible for the content or accuracy of any third-party website or resource.
        </p>
        <li>
          <b>Termination</b>
        </li>
        <p className="terms-text">
          The Company may terminate your access to the Website at any time, for any reason, or for no reason at all.
        </p>
        <li>
          <b>Governing Law</b>
        </li>
        <p className="terms-text">
          These Terms shall be governed by and construed in accordance with the laws of India.
        </p>
        <li>
          <b>Entire Agreement</b>
        </li>
        <p className="terms-text">
          These Terms constitute the entire agreement between you and the Company regarding your use of the Website.
        </p>
        <li>
          <b>Changes to Terms</b>
        </li>
        <p className="terms-text">
          The Company may revise these Terms at any time by updating this posting. You are bound by any revisions and should therefore periodically visit this page to review the current Terms.
        </p>
      </ol>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Terms;
