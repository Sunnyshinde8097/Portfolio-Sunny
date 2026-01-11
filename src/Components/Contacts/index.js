import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: #6200ea;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6200ea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;

const WordCounter = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageWordCount, setMessageWordCount] = useState(0);
  const form = useRef();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const wordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const validateForm = () => {
    const newErrors = {};
    const email = form.current.from_email.value;
    const name = form.current.from_name.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!name) newErrors.name = "Name is required";
    if (!subject) newErrors.subject = "Subject is required";

    if (!message) {
      newErrors.message = "Message is required";
    } else if (wordCount(message) < 10) {
      newErrors.message = "Message must be at least 10 words";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const formData = {
      from_email: form.current.from_email.value,
      from_name: form.current.from_name.value,
      title: form.current.subject.value,
      message: form.current.message.value,
      time: new Date().toLocaleTimeString(),
      jobTitle: "Full Stack Developer",
    };

    emailjs
      .send("service_t9nv8um", "template_wlwljsf", formData, "qINDGhx3kMfeX8ox9")
      .then(
        () => {
          setLoading(false);
          setOpen(true);
          form.current.reset();
          setMessageWordCount(0);
        },
        (error) => {
          setLoading(false);
          console.error(error.text);
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <ContactInput placeholder="Your Name" name="from_name" />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
          <ContactInput placeholder="Subject" name="subject" />
          {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
          <ContactInputMessage
            placeholder="Message (10+ words)"
            rows="6"
            name="message"
            onChange={(e) => setMessageWordCount(wordCount(e.target.value))}
          />
          <WordCounter>Word count: {messageWordCount}</WordCounter>
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
          <ContactButton type="submit" value="Send" />
        </ContactForm>

        {/* Loading Popup */}
        {loading && (
          <PopupOverlay>
            <PopupBox>
              <Spinner />
              <p>Sending your email...</p>
            </PopupBox>
          </PopupOverlay>
        )}

        {/* Success Popup */}
        {open && (
          <PopupOverlay>
            <PopupBox>
              <h2>✅ Email Sent Successfully!</h2>
              <p>Thank you for reaching out. I’ll get back to you soon.</p>
              <CloseButton onClick={() => setOpen(false)}>Close</CloseButton>
            </PopupBox>
          </PopupOverlay>
        )}
      </Wrapper>
    </Container>
  );
};

export default Contact;
