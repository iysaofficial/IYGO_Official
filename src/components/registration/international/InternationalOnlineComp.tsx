import React, { useState, useEffect } from "react";

interface FormState {
  selectedMaxNamaLengkap: string;
  selectedMaxProject: string;
}

const InternationalOnlineComp: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    selectedMaxNamaLengkap: "",
    selectedMaxProject: ""
  });
  
  const maxNameChars = 180;

  const handleInputNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= maxNameChars) {
      setFormState(prev => ({
        ...prev,
        selectedMaxNamaLengkap: value
      }));
    }
  };

  useEffect(() => {
    const scriptURL =
      "";

    const form = document.forms.namedItem("regist-form");
    let buttonCounter = 0;

    if (form) {
      const handleSubmit = async (e: Event) => {
        e.preventDefault();
        
        if (buttonCounter === 0) {
          try {
            buttonCounter++;
            const submitButton = form.querySelector('.submit-button') as HTMLButtonElement;
            
            // Disable button and show loading state
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = 'SENDING...';
              submitButton.style.backgroundColor = '#6b7280';
            }
            
            await fetch(scriptURL, {
              method: "POST",
              body: new FormData(form),
            });
            
            // Success state
            if (submitButton) {
              submitButton.textContent = 'SUCCESSFULLY SENT!';
              submitButton.style.backgroundColor = '#10b981';
            }
            
            // Redirect after 2 seconds
            setTimeout(() => {
              window.location.href = "/registration/success";
            }, 2000);
            
          } catch (error) {
            console.error("Error while sending data:", error);
            
            // Error state
            const submitButton = form.querySelector('.submit-button') as HTMLButtonElement;
            if (submitButton) {
              submitButton.textContent = 'FAILED TO SEND - TRY AGAIN';
              submitButton.style.backgroundColor = '#ef4444';
              submitButton.disabled = false;
            }
            buttonCounter = 0;
          }
        }
      };

      form.addEventListener("submit", handleSubmit);

      // Cleanup listener
      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, []);

  // Character counter color logic
  const getCharCounterColor = (length: number, max: number): string => {
    if (length > max * 0.9) return '#ef4444'; // Red
    if (length > max * 0.8) return '#f59e0b'; // Orange
    return '#64748b'; // Default gray
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <HeaderSection />
      
      {/* Instruction Section */}
      <InstructionSection />

      {/* Registration Form */}
      <div className="registration-form">
        <form name="regist-form">
          
          {/* BIODATA SECTION */}
          <BiodataSection 
            selectedMaxNamaLengkap={formState.selectedMaxNamaLengkap}
            handleInputNameChange={handleInputNameChange}
            maxNameChars={maxNameChars}
            charCounterColor={getCharCounterColor(formState.selectedMaxNamaLengkap.length, maxNameChars)}
          />

          {/* DATA SEKOLAH SECTION */}
          <DataSekolahSection />

          {/* DATA PEMBIMBING SECTION */}
          <DataPembimbingSection />

          {/* INFORMASI UMUM SECTION */}
          <InformasiUmumSection />

          <input type="hidden" name="PRICE" value="Rp. 300.000" readOnly />

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button">
              SUBMIT REGISTRATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Header Component
const HeaderSection: React.FC = () => (
  <div className="header-section">
    <div className="header-content">
      <h1 className="main-title">REGISTRATION FORM</h1>
      <div className="title-underline"></div>
      <h2 className="event-title">IYGO 2026</h2>
    </div>
  </div>
);

// Instruction Component
const InstructionSection: React.FC = () => (
  <div className="instruction-section">
    <h3 className="instruction-title">
      HELLO IYGO 2026 PARTICIPANTS, Please consider the following information before filling out the registration form :
    </h3>
    <div className="instruction-list">
      <div className="instruction-item">
        <span className="instruction-number">1</span>
        <p className="instruction-text">
          Please fill in the required data correctly and ensure there are no writing errors. Also make sure that the data submitted is final and has not changed.
        </p>
      </div>
      <div className="instruction-item">
        <span className="instruction-number">2</span>
        <p className="instruction-text">
          After making sure the data is correct, you can click <strong>SUBMIT REGISTRATION</strong> button once. If the data has been successfully submitted, you will be moved to another page.
        </p>
      </div>
      <div className="instruction-item">
        <span className="instruction-number">3</span>
        <p className="instruction-text">
          There will be an information email that the registration has been received sent to the team leaders email address, and the file will be validated by our team. Please be patient and wait for a maximum of 3 days after the registration time, the Letter of Acceptance (LOA) will be sent to the team leaders email address.
        </p>
      </div>
    </div>
  </div>
);

// Biodata Section Component
interface BiodataSectionProps {
  selectedMaxNamaLengkap: string;
  handleInputNameChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxNameChars: number;
  charCounterColor: string;
}

const BiodataSection: React.FC<BiodataSectionProps> = ({
  selectedMaxNamaLengkap,
  handleInputNameChange,
  maxNameChars,
  charCounterColor
}) => (
  <section className="form-section">
    <div className="section-header">
      <h2 className="section-title">BIODATA</h2>
      <div className="section-underline"></div>
    </div>
    
    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Participant Categories</label>
        <input
          type="text"
          name="PARTICIPANT_CATEGORY"
          className="input-field"
          value="International Participant"
          readOnly
        />
      </div>
      
      <div className="field-group">
        <label className="field-label">Competition Category</label>
        <select name="COMPETITION_CATEGORY" className="select-field" required>
          <option value="">--Choose Competition Category--</option>
          <option value="Online Competition">Online Competition</option>
        </select>
      </div>
    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Name of Leader & Member Team</label>
        <div className="field-note">
          <p>Enter the name of the team leader and team members with the team leaders name at the beginning, with the following format:</p>
          <p><strong>Note:</strong> maximum 1 members + 1 team leader</p>
          <div className="example-box">
            <div>Kamal Putra Ramadhan</div>
            <div>Ranu Ramadhan</div>
          </div>
        </div>
        <textarea
          name="FULL_NAME"
          className="textarea-field"
          placeholder="Enter Name of Leader & Member Team"
          required
          value={selectedMaxNamaLengkap}
          onChange={handleInputNameChange}
        />
        <div className="char-counter" style={{ color: charCounterColor }}>
          {selectedMaxNamaLengkap.length} / {maxNameChars} Character
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Phone Code</label>
        <select name="PHONE_CODE" className="select-field" required>
            <option value="">--Choose Phone Code--</option>
            <option value="Afghanistan +93">Afghanistan +93</option>
            <option value="Albania +355">Albania +355</option>
            <option value="Algeria +213">Algeria +213</option>
            <option value="Andorra +376">Andorra +376</option>
            <option value="Angola +244">Angola +244</option>
            <option value="Antigua and Barbuda +1-268">Antigua and Barbuda +1-268</option>
            <option value="Argentina +54">Argentina +54</option>
            <option value="Armenia +374">Armenia +374</option>
            <option value="Australia +61">Australia +61</option>
            <option value="Austria +43">Austria +43</option>
            <option value="Azerbaijan +994">Azerbaijan +994</option>
            <option value="Bahamas +1-242">Bahamas +1-242</option>
            <option value="Bahrain +973">Bahrain +973</option>
            <option value="Bangladesh +880">Bangladesh +880</option>
            <option value="Barbados +1-246">Barbados +1-246</option>
            <option value="Belarus +375">Belarus +375</option>
            <option value="Belgium +32">Belgium +32</option>
            <option value="Belize +501">Belize +501</option>
            <option value="Benin +229">Benin +229</option>
            <option value="Bhutan +975">Bhutan +975</option>
            <option value="Bolivia +591">Bolivia +591</option>
            <option value="Bosnia and Herzegovina +387">Bosnia and Herzegovina +387</option>
            <option value="Botswana +267">Botswana +267</option>
            <option value="Brazil +55">Brazil +55</option>
            <option value="Brunei Darussalam +673">Brunei Darussalam +673</option>
            <option value="Bulgaria +359">Bulgaria +359</option>
            <option value="Burkina Faso +226">Burkina Faso +226</option>
            <option value="Burundi +257">Burundi +257</option>
            <option value="Cambodia +855">Cambodia +855</option>
            <option value="Cameroon +237">Cameroon +237</option>
            <option value="Canada +1">Canada +1</option>
            <option value="Cape Verde +238">Cape Verde +238</option>
            <option value="Central African Republic +236">Central African Republic +236</option>
            <option value="Chad +235">Chad +235</option>
            <option value="Chile +56">Chile +56</option>
            <option value="China +86">China +86</option>
            <option value="Colombia +57">Colombia +57</option>
            <option value="Comoros +269">Comoros +269</option>
            <option value="Congo +242">Congo +242</option>
            <option value="Congo (Democratic Republic) +243">Congo (Democratic Republic) +243</option>
            <option value="Costa Rica +506">Costa Rica +506</option>
            <option value="Croatia +385">Croatia +385</option>
            <option value="Cuba +53">Cuba +53</option>
            <option value="Cyprus +357">Cyprus +357</option>
            <option value="Czech Republic +420">Czech Republic +420</option>
            <option value="Denmark +45">Denmark +45</option>
            <option value="Djibouti +253">Djibouti +253</option>
            <option value="Dominica +1-767">Dominica +1-767</option>
            <option value="Dominican Republic +1-809">Dominican Republic +1-809</option>
            <option value="Ecuador +593">Ecuador +593</option>
            <option value="Egypt +20">Egypt +20</option>
            <option value="El Salvador +503">El Salvador +503</option>
            <option value="Equatorial Guinea +240">Equatorial Guinea +240</option>
            <option value="Eritrea +291">Eritrea +291</option>
            <option value="Estonia +372">Estonia +372</option>
            <option value="Eswatini +268">Eswatini +268</option>
            <option value="Ethiopia +251">Ethiopia +251</option>
            <option value="Fiji +679">Fiji +679</option>
            <option value="Finland +358">Finland +358</option>
            <option value="France +33">France +33</option>
            <option value="Gabon +241">Gabon +241</option>
            <option value="Gambia +220">Gambia +220</option>
            <option value="Georgia +995">Georgia +995</option>
            <option value="Germany +49">Germany +49</option>
            <option value="Ghana +233">Ghana +233</option>
            <option value="Greece +30">Greece +30</option>
            <option value="Grenada +1-473">Grenada +1-473</option>
            <option value="Guatemala +502">Guatemala +502</option>
            <option value="Guinea +224">Guinea +224</option>
            <option value="Guinea-Bissau +245">Guinea-Bissau +245</option>
            <option value="Guyana +592">Guyana +592</option>
            <option value="Haiti +509">Haiti +509</option>
            <option value="Honduras +504">Honduras +504</option>
            <option value="Hong Kong +852">Hong Kong +852</option>
            <option value="Hungary +36">Hungary +36</option>
            <option value="Iceland +354">Iceland +354</option>
            <option value="India +91">India +91</option>
            <option value="Indonesia +62">Indonesia +62</option>
            <option value="Iran +98">Iran +98</option>
            <option value="Iraq +964">Iraq +964</option>
            <option value="Ireland +353">Ireland +353</option>
            <option value="Italy +39">Italy +39</option>
            <option value="Jamaica +1-876">Jamaica +1-876</option>
            <option value="Japan +81">Japan +81</option>
            <option value="Jordan +962">Jordan +962</option>
            <option value="Kazakhstan +7">Kazakhstan +7</option>
            <option value="Kenya +254">Kenya +254</option>
            <option value="Kiribati +686">Kiribati +686</option>
            <option value="Kuwait +965">Kuwait +965</option>
            <option value="Kyrgyzstan +996">Kyrgyzstan +996</option>
            <option value="Laos +856">Laos +856</option>
            <option value="Latvia +371">Latvia +371</option>
            <option value="Lebanon +961">Lebanon +961</option>
            <option value="Lesotho +266">Lesotho +266</option>
            <option value="Liberia +231">Liberia +231</option>
            <option value="Libya +218">Libya +218</option>
            <option value="Liechtenstein +423">Liechtenstein +423</option>
            <option value="Lithuania +370">Lithuania +370</option>
            <option value="Luxembourg +352">Luxembourg +352</option>
            <option value="Madagascar +261">Madagascar +261</option>
            <option value="Malawi +265">Malawi +265</option>
            <option value="Malaysia +60">Malaysia +60</option>
            <option value="Maldives +960">Maldives +960</option>
            <option value="Mali +223">Mali +223</option>
            <option value="Malta +356">Malta +356</option>
            <option value="Marshall Islands +692">Marshall Islands +692</option>
            <option value="Mauritania +222">Mauritania +222</option>
            <option value="Mauritius +230">Mauritius +230</option>
            <option value="Mexico +52">Mexico +52</option>
            <option value="Micronesia +691">Micronesia +691</option>
            <option value="Moldova +373">Moldova +373</option>
            <option value="Monaco +377">Monaco +377</option>
            <option value="Mongolia +976">Mongolia +976</option>
            <option value="Montenegro +382">Montenegro +382</option>
            <option value="Morocco +212">Morocco +212</option>
            <option value="Mozambique +258">Mozambique +258</option>
            <option value="Myanmar +95">Myanmar +95</option>
            <option value="Namibia +264">Namibia +264</option>
            <option value="Nauru +674">Nauru +674</option>
            <option value="Nepal +977">Nepal +977</option>
            <option value="Netherlands +31">Netherlands +31</option>
            <option value="New Zealand +64">New Zealand +64</option>
            <option value="Nicaragua +505">Nicaragua +505</option>
            <option value="Niger +227">Niger +227</option>
            <option value="Nigeria +234">Nigeria +234</option>
            <option value="North Korea +850">North Korea +850</option>
            <option value="North Macedonia +389">North Macedonia +389</option>
            <option value="Norway +47">Norway +47</option>
            <option value="Oman +968">Oman +968</option>
            <option value="Pakistan +92">Pakistan +92</option>
            <option value="Palau +680">Palau +680</option>
            <option value="Palestine +970">Palestine +970</option>
            <option value="Panama +507">Panama +507</option>
            <option value="Papua New Guinea +675">Papua New Guinea +675</option>
            <option value="Paraguay +595">Paraguay +595</option>
            <option value="Peru +51">Peru +51</option>
            <option value="Philippines +63">Philippines +63</option>
            <option value="Poland +48">Poland +48</option>
            <option value="Portugal +351">Portugal +351</option>
            <option value="Qatar +974">Qatar +974</option>
            <option value="Romania +40">Romania +40</option>
            <option value="Russia +7">Russia +7</option>
            <option value="Rwanda +250">Rwanda +250</option>
            <option value="Saint Kitts and Nevis +1-869">Saint Kitts and Nevis +1-869</option>
            <option value="Saint Lucia +1-758">Saint Lucia +1-758</option>
            <option value="Saint Vincent and the Grenadines +1-784">Saint Vincent and the Grenadines +1-784</option>
            <option value="Samoa +685">Samoa +685</option>
            <option value="San Marino +378">San Marino +378</option>
            <option value="Sao Tome and Principe +239">Sao Tome and Principe +239</option>
            <option value="Saudi Arabia +966">Saudi Arabia +966</option>
            <option value="Senegal +221">Senegal +221</option>
            <option value="Serbia +381">Serbia +381</option>
            <option value="Seychelles +248">Seychelles +248</option>
            <option value="Sierra Leone +232">Sierra Leone +232</option>
            <option value="Singapore +65">Singapore +65</option>
            <option value="Slovakia +421">Slovakia +421</option>
            <option value="Slovenia +386">Slovenia +386</option>
            <option value="Solomon Islands +677">Solomon Islands +677</option>
            <option value="Somalia +252">Somalia +252</option>
            <option value="South Africa +27">South Africa +27</option>
            <option value="South Korea +82">South Korea +82</option>
            <option value="South Sudan +211">South Sudan +211</option>
            <option value="Spain +34">Spain +34</option>
            <option value="Sri Lanka +94">Sri Lanka +94</option>
            <option value="Sudan +249">Sudan +249</option>
            <option value="Suriname +597">Suriname +597</option>
            <option value="Sweden +46">Sweden +46</option>
            <option value="Switzerland +41">Switzerland +41</option>
            <option value="Syria +963">Syria +963</option>
            <option value="Taiwan +886">Taiwan +886</option>
            <option value="Tajikistan +992">Tajikistan +992</option>
            <option value="Tanzania +255">Tanzania +255</option>
            <option value="Thailand +66">Thailand +66</option>
            <option value="Togo +228">Togo +228</option>
            <option value="Tonga +676">Tonga +676</option>
            <option value="Trinidad and Tobago +1-868">Trinidad and Tobago +1-868</option>
            <option value="Tunisia +216">Tunisia +216</option>
            <option value="Turkey +90">Turkey +90</option>
            <option value="Turkmenistan +993">Turkmenistan +993</option>
            <option value="Tuvalu +688">Tuvalu +688</option>
            <option value="Uganda +256">Uganda +256</option>
            <option value="Ukraine +380">Ukraine +380</option>
            <option value="United Arab Emirates +971">United Arab Emirates +971</option>
            <option value="United Kingdom +44">United Kingdom +44</option>
            <option value="United States +1">United States +1</option>
            <option value="Uruguay +598">Uruguay +598</option>
            <option value="Uzbekistan +998">Uzbekistan +998</option>
            <option value="Vanuatu +678">Vanuatu +678</option>
            <option value="Vatican City +379">Vatican City +379</option>
            <option value="Venezuela +58">Venezuela +58</option>
            <option value="Vietnam +84">Vietnam +84</option>
            <option value="Yemen +967">Yemen +967</option>
            <option value="Zambia +260">Zambia +260</option>
            <option value="Zimbabwe +263">Zimbabwe +263</option>
        </select>
      </div>
    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Leader WhatsApp Number</label>
        <div className="field-note">
          <p>Please write with phone code, example : (phone code) (your number) +62 8177091xxxx</p>
          <p><strong>Notes:</strong> Please fill in the team leaders number correctly to be added to the WhatsApp Group.</p>
        </div>
        <input
          type="number"
          name="LEADER_WHATSAPP"
          className="input-field"
          placeholder="Enter Your Leader WhatsApp Number"
          required
        />
      </div>

      <div className="field-group">
        <label className="field-label">Leader Email Address</label>
        <div className="field-note">
          <p><strong>Notes:</strong> Please fill in the email correctly, LOA submissions will be sent via the team leaders email address filled in.</p>
        </div>
        <input
          type="email"
          name="LEADER_EMAIL"
          className="input-field"
          placeholder="Enter Your Leader Email Address"
          required
        />
      </div>
    </div>
  </section>
);

// Data Sekolah Section Component
const DataSekolahSection: React.FC = () => (
  <section className="form-section">
    <div className="section-header">
      <h2 className="section-title">SCHOOL DATA</h2>
      <div className="section-underline"></div>
    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Name of School/University</label>
        <div className="field-note">
          <p><strong>Notes:</strong> If the members are not in the same institution, enter the name of the school with the format in the order of the name of the team leader and team members from each school, with the following format:</p>
          <div className="example-box">
            <div>Bina Senior High School</div>
            <div>Happy Senior High School</div>
          </div>
        </div>
        <textarea
          name="SCHOOL_NAME"
          className="textarea-field"
          placeholder="Enter School Name of Leader & Member Team"
          required
        />
      </div>

    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Educational Level</label>
        <select name="EDUCATIONAL_LEVEL" className="select-field" required>
          <option value="">--Choose Your Educational Level--</option>
          <option value="Senior High School">Senior High School</option>
          <option value="University">University</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label">Country</label>
        <input
          type="text"
          name="COUNTRY"
          className="input-field"
          placeholder="Input Your Country"
          required
        />
      </div>
    </div>
  </section>
);

// Data Pembimbing Section Component
const DataPembimbingSection: React.FC = () => (
  <section className="form-section">
    <div className="section-header">
      <h2 className="section-title">SUPERVISOR DATA</h2>
      <div className="section-underline"></div>
    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Name of Teacher/Supervisor</label>
        <textarea
          name="SUPERVISOR_NAME"
          className="textarea-field"
          placeholder="Enter Your Teacher/Supervisor Name"
          required
        />
      </div>

      <div className="field-group">
        <label className="field-label">Teacher/Supervisor WhatsApp Number</label>
        <div className="field-note">
          <p>Please write with phone code, example : (phone code) (your number) +62 8177091xxxx</p>
        </div>
        <input
          type="number"
          name="SUPERVISOR_WHATSAPP_NUMBER"
          className="input-field"
          placeholder="Enter Your Teacher/Supervisor WhatsApp Number"
          required
        />
      </div>

      <div className="field-group">
        <label className="field-label">Teacher/Supervisor Email Address</label>
        <input
          type="email"
          name="SUPERVISOR_EMAIL"
          className="input-field"
          placeholder="Enter Your Teacher/Supervisor Email Address"
          required
        />
      </div>
    </div>
  </section>
);

// Informasi Umum Section Component
const InformasiUmumSection: React.FC = () => (
  <section className="form-section">
    <div className="section-header">
      <h2 className="section-title">GENERAL INFORMATION</h2>
      <div className="section-underline"></div>
    </div>

    <div className="field-grid">
      <div className="field-group">
        <label className="field-label">Social Media</label>
        <div className="field-note">
          <p>If you dont have whatsapp number, please write down your social media account. (Ex: Instagram/FB/Telegram/Line)</p>
          <div className="example-box">
            <div>https://www.instagram.com/iicyms_official/</div>
            <div>iysa_official</div>
          </div>
        </div>
        <textarea
          name="SOSMED"
          className="textarea-field"
          placeholder="Enter Your Social Media Account"
          required
        />
      </div>

      <div className="field-group">
        <label className="field-label">IYGO 2026 Competition Information Resources</label>
        <select name="INFORMATION_RESOURCES" className="select-field" required>
          <option value="">--Choose Information Resources--</option>
          <option value="IYSA Instagram">IYSA Instagram</option>
          <option value="IYGO Instagram">IYGO Instagram</option>
          <option value="Supervisor/School">Supervisor/School</option>
          <option value="IYSA FaceBook">IYSA FaceBook</option>
          <option value="IYSA Linkedin">IYSA Linkedin</option>
          <option value="IYSA Website">IYSA Website</option>
          <option value="IYGO Website">IYGO Website</option>
          <option value="IYSA Email">IYSA Email</option>
          <option value="IYGO Email">IYGO Email</option>
          <option value="Previous Event">Previous Event</option>
          <option value="Etc">Etc</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label">
          If you received free registration from a previous event or school visit, please attach documentary proof.
        </label>
        <input
          type="url"
          name="FILE"
          className="input-field"
          placeholder="Upload The Link Of The Drive File"
        />
      </div>
    </div>
  </section>
);

export default InternationalOnlineComp;