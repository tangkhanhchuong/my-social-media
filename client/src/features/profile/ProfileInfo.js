import React, { useState } from "react"
import { FaCalendar, FaCamera, FaGithub, FaHome } from "react-icons/fa"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { useMutation } from "react-query"
import { FastField, Formik, Form } from 'formik'
import moment from 'moment'

import StCoverPhoto from "shared/styles/CoverPhoto"
import { StButton } from "shared/styles/Buttons"
import StAvatar from "shared/styles/Avatar"
import { StKingWrapper } from "shared/styles/Wrappers"
import { OverlayImagePicker } from 'shared/inputs/OverlayImagePicker'
import Input from "components/Input"
import userRequest from "http/user_requests"
import { changeProfile } from 'app/slices/auth_slice'

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

const Avatar = styled(StAvatar)`
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

const generateFilePath = (file) => {
  const { REACT_APP_SYSTEM_URL } = process.env

  if(!file) return ""

  if(typeof file === 'string')  return `${ REACT_APP_SYSTEM_URL }/${file}`
  return URL.createObjectURL(file)
}

const ProfileInfo = () => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const dispatch = useDispatch()
  
  const authReducer = useSelector(state => state.auth)  
  const { username, profile } = authReducer
  const { bio, location, website, joinedDate, avatar: initAvatar, coverPicture: initCoverPicture } = profile
  const coverPicUrl = `https://cdn.tgdd.vn/2020/05/content/12-800x440.jpg`
  const avatarUrl = `https://zalo-api.zadn.vn/3/7/3/f/3/10177/icon_pre/heoxanh_thumb.png`
  const [avatar, setAvatar] = useState(initAvatar)
  const [coverPicture, setCoverPicture] = useState(initCoverPicture)
  
  const { mutate } = useMutation(userRequest.changeProfile, { mutationKey: 'change_profile' })

  const initialValues = {
    username,
    bio,
    location,
    website,
    joinedDate
  }

  const onEditProfileSuccess = (data) => {
    const updatedProfile = data.data
    dispatch(changeProfile(updatedProfile))
  }

  const onEditProfile = (values) =>{
    const formData = new FormData()
    formData.append("avatar", avatar)
    formData.append("coverPicture", coverPicture)
    for(let val in values) {
      formData.append(val, values[val])
    }
    mutate(formData, {
      onSuccess: onEditProfileSuccess
    })
  }
  return (
    <Wrapper>
      <StCoverPhoto src={generateFilePath(initCoverPicture)} alt="cover" />
      <SInfoContainer>
        <Avatar top={70} size="150px" src={generateFilePath(initAvatar)} alt="profile" />

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
                          <StCoverPhoto src={generateFilePath(coverPicture)} alt="cover" />
                        </OverlayImagePicker>  

                        <OverlayImagePicker circle onChange={(e)=>setAvatar(e.target.files[0])}>
                          <Avatar top={50} left={10} size="120px" src={generateFilePath(avatar)} alt="profile" />
                        </OverlayImagePicker>  

                        <StKingWrapper>
                          <FastField
                            name="username"
                            component={Input}
                            placeholder="Username"
                            defaultValue={username}
                          />

                          <FastField
                              name="bio"
                              component={Input}
                              placeholder="Bio"
                              defaultValue={bio}
                          />

                          <FastField
                              name="location"
                              component={Input}
                              placeholder="Location"
                              defaultValue={location}
                          />

                          <FastField
                              name="website"
                              component={Input}
                              placeholder="Website"
                              defaultValue={website}
                          />

                          <FastField
                              name="joinedDate"
                              component={Input}       
                              placeholder="Joined Date"
                              defaultValue={new Date(joinedDate).toISOString().substring(0, 10)}
                              type="date"
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
          <STitle>{ username }</STitle>
        </SInfoRow> 
        <SInfoRow>
          { bio }
        </SInfoRow>
        <SInfoRow>
          <FaHome size={20} />
          <SInfoContent>{ location }</SInfoContent>
        </SInfoRow>
        <SInfoRow>
          <FaGithub size={20} />
          <SInfoContent>{ website }</SInfoContent>
        </SInfoRow>
        <SInfoRow>
          <FaCalendar size={20} />
          <SInfoContent>Joined { moment(joinedDate).format('LL') }</SInfoContent>
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
