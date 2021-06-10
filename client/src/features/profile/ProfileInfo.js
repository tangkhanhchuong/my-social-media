import React, { useState } from "react"
import { FaCalendar, FaCamera } from "react-icons/fa"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { useMutation } from "react-query"
import { FastField, Formik, Form } from 'formik'

import CoverPhoto from "styles/CoverPhoto"
import { StButton } from "styled/Buttons"
import Avatar from "styles/Avatar"
import OverlayImagePicker from 'components/inputs/OverlayImagePicker'
import { StKingWrapper } from 'styled/Wrappers'
import Input from "components/Input"
import userRequest from "http/user_requests"


const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding-bottom: 1rem;
  width: 50%
`;

const STitle = styled.h5`
  font-weight: bold
`

const SNumFollowers = styled.span`
  margin-right: 30px
`

const SCountNumber = styled.span`
  font-weight: bold
`

const StAvatar = styled(Avatar)`
  margin-top: ${p => p.top ? -p.top + "px" : '0px'};
  margin-left: ${p => p.left ? p.left + "px" : '0px'};
`

const SInfoContainer = styled.div`
  padding-left: 20px;
  position: relative
`

const SInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px

`

const SInfoContent = styled.div`
  margin-left: 10px;
`

const SModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ProfileInfo = () => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const coverPicUrl = `https://cdn.tgdd.vn/2020/05/content/12-800x440.jpg`
  const avatarUrl = `https://zalo-api.zadn.vn/3/7/3/f/3/10177/icon_pre/heoxanh_thumb.png`
  const [avatar, setAvatar] = useState()
  const [coverPicture, setCoverPicture] = useState()

  const authReducer = useSelector(state => state.auth)
  const { username } = authReducer

  const { mutate } = useMutation(userRequest.changeProfile, { mutationKey: 'change_profile' })

  const initialValues = {
    bio: "",
    location: "",
    website: "",
    joined_date: ""
  }

  const onEditProfile = (values) =>{
    const formData = new FormData()
    formData.append("avatar", avatar)
    formData.append("coverPicture", coverPicture)
    for(let val in values) {
      formData.append(val.toString(), val)
    }
    mutate(formData)
  }

  return (
    <Wrapper>
      <CoverPhoto src={coverPicUrl} alt="cover" />
      <SInfoContainer>
        <StAvatar top={70} size="150px" src={avatarUrl} alt="profile" />

        <StButton sm outline relative onClick={toggle}>
          Edit Profile
          <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
              <ModalBody>
              <Formik
                initialValues={initialValues}
                onSubmit={onEditProfile}
              >
                {formikProps => {
                    return ( 
                      <Form>
                        <OverlayImagePicker onChange={(e)=>setCoverPicture(e.target.files[0])}>
                          <CoverPhoto src={coverPicUrl} alt="cover" />
                        </OverlayImagePicker>  

                        <OverlayImagePicker circle onChange={(e)=>setAvatar(e.target.files[0])}>
                          <StAvatar top={50} left={10} size="120px" src={avatarUrl} alt="profile" />
                        </OverlayImagePicker>  

                        <StKingWrapper>
                          <FastField
                              name="bio"
                              component={Input}
                              placeholder="Bio"
                          />

                          <FastField
                              name="location"
                              component={Input}
                              placeholder="Location"
                          />

                          <FastField
                              name="website"
                              component={Input}
                              placeholder="Website"
                          />

                          <FastField
                              name="joined_date"
                              component={Input}       
                              placeholder="Joined Date"
                          />
                        </StKingWrapper>
                        <SModalFooter>
                          <StButton sm outline onClick={toggle} type="submit">Save</StButton>{' '}
                        </SModalFooter> 
                      </Form>
                )}}
                </Formik>

              </ModalBody>
          </Modal>
        </StButton>

        <SInfoRow>
          <STitle>{username}</STitle>
        </SInfoRow>
        <SInfoRow>
          Somebody lost a dog
        </SInfoRow>
        <SInfoRow>
          <FaCalendar size={20} />
          <SInfoContent>Joined May 2021</SInfoContent>
        </SInfoRow>

        <SNumFollowers>
          <SCountNumber>2</SCountNumber> followers
        </SNumFollowers>
        <SNumFollowers>
          <SCountNumber>2</SCountNumber> following
        </SNumFollowers>
      </SInfoContainer>
    </Wrapper>
  );
}

export default ProfileInfo;
