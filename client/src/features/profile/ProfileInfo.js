import React, { useState } from "react"
import { FaCalendar, FaCamera, FaGithub, FaHome } from "react-icons/fa"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { useMutation } from "react-query"
import { FastField, Formik, Form } from "formik"
import moment from "moment"

import StCoverPhoto from "shared/styles/CoverPhoto"
import { StButton } from "shared/styles/Buttons"
import StAvatar from "shared/styles/Avatar"
import { StKingWrapper } from "shared/styles/Wrappers"
import OverlayImagePicker from "shared/inputs/OverlayImagePicker"
import Input from "components/Input"
import userRequest from "http/user_requests"
import { changeProfile } from "app/slices/auth_slice"

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding-bottom: 1rem;
  width: 50%;
`

const STitle = styled.h5`
  font-weight: bold;
`

const SNumFollowers = styled.span`
  margin-right: 30px;
`

const SCountNumber = styled.span`
  font-weight: bold;
`

const SInfoContainer = styled.div`
  padding-left: 20px;
  position: relative;
`

const SInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

  if (!file) return ""

  if (typeof file === "string") return `${REACT_APP_SYSTEM_URL}/${file}`
  return URL.createObjectURL(file)
}

const ProfileInfo = () => {
  const dispatch = useDispatch()

  const authReducer = useSelector((state) => state.auth)
  const { username, profile } = authReducer
  const {
    bio,
    location,
    website,
    joinedDate,
    avatar: initAvatar,
    coverPicture: initCoverPicture,
  } = profile
  const coverPicUrl = `https://via.placeholder.com/1x1`
  const avatarUrl = `data:image/png;base64,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`
  const [avatar, setAvatar] = useState(initAvatar)
  const [coverPicture, setCoverPicture] = useState(initCoverPicture)

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
    setTimeout(() => {
      setAvatar(initAvatar)
      setCoverPicture(initCoverPicture)
    }, 500)
  }

  const { mutate } = useMutation(userRequest.changeProfile, {
    mutationKey: "change_profile",
  })

  const initialValues = {
    username,
    bio,
    location,
    website,
    joinedDate,
  }

  const onEditProfileSuccess = (data) => {
    const updatedProfile = data.data
    dispatch(changeProfile(updatedProfile))
  }

  const onEditProfile = (values) => {
    const formData = new FormData()
    formData.append("avatar", avatar)
    formData.append("coverPicture", coverPicture)
    for (let val in values) {
      formData.append(val, values[val])
    }
    mutate(formData, {
      onSuccess: onEditProfileSuccess,
    })
  }
  return (
    <Wrapper>
      <StCoverPhoto src={initCoverPicture ? generateFilePath(initCoverPicture) : coverPicUrl} alt="cover" />
      <SInfoContainer>
        <StAvatar
          top={70}
          lg
          src={initAvatar ? generateFilePath(initAvatar) : avatarUrl}
          alt="profile"
        />

        <StButton sm outline relative onClick={toggle}>
          Edit Profile
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
            <ModalBody>
              <Formik initialValues={initialValues} onSubmit={onEditProfile}>
                {(formikProps) => {
                  return (
                    <Form>
                      <OverlayImagePicker
                        onChange={(e) => setCoverPicture(e.target.files[0])}
                      >
                        <StCoverPhoto
                          src={initCoverPicture ? generateFilePath(initCoverPicture) : coverPicUrl}
                          alt="cover"
                        />
                      </OverlayImagePicker>

                      <OverlayImagePicker
                        avatar
                        circle
                        onChange={(e) => setAvatar(e.target.files[0])}
                      >
                        <StAvatar
                          top={50}
                          left={10}
                          md
                          src={generateFilePath(avatar)}
                          alt="profile"
                        />
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
                          defaultValue={new Date(joinedDate)
                            .toISOString()
                            .substring(0, 10)}
                          type="date"
                        />
                      </StKingWrapper>
                      <SModalFooter>
                        <StButton sm outline onClick={toggle} type="submit">
                          Save
                        </StButton>{" "}
                      </SModalFooter>
                    </Form>
                  )
                }}
              </Formik>
            </ModalBody>
          </Modal>
        </StButton>

        <SInfoRow>
          <STitle>{username}</STitle>
        </SInfoRow>
        <SInfoRow>{bio}</SInfoRow>
        <SInfoRow>
          <FaHome size={20} />
          <SInfoContent>{location}</SInfoContent>
        </SInfoRow>
        <SInfoRow>
          <FaGithub size={20} />
          <SInfoContent>{website}</SInfoContent>
        </SInfoRow>
        <SInfoRow>
          <FaCalendar size={20} />
          <SInfoContent>Joined {moment(joinedDate).format("LL")}</SInfoContent>
        </SInfoRow>

        <SNumFollowers>
          <SCountNumber>2</SCountNumber> followers
        </SNumFollowers>
        <SNumFollowers>
          <SCountNumber>2</SCountNumber> following
        </SNumFollowers>
      </SInfoContainer>
    </Wrapper>
  )
}

export default ProfileInfo
