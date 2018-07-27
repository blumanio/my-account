import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import moment from 'moment'
import 'moment/locale/pt-br'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PersonalDataBox = ({ profile, onEditClick, intl }) => {
  const genders = {
    male: intl.formatMessage({ id: 'personalData.genders.male' }),
    female: intl.formatMessage({ id: 'personalData.genders.female' }),
    others: intl.formatMessage({ id: 'personalData.genders.others' }),
  }

  if (!profile) return null

  return (
    <ContentBox
      width={'60'}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <div className="mb8-ns flex-ns">
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.firstName' })}
            content={profile.firstName}
          />
        </div>
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.lastName' })}
            content={profile.lastName}
          />
        </div>
      </div>
      <div className="mb8">
        <DataEntry
          label={intl.formatMessage({ id: 'personalData.email' })}
          content={profile.email}
        />
      </div>
      <div className="mb8-ns flex-ns">
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.document' })}
            content={profile.document}
          />
        </div>
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.gender' })}
            content={profile.gender}
          />
        </div>
      </div>
      <div className="mb8-ns flex-ns">
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.birthDate' })}
            content={moment(profile.birthDate).format('L')}
          />
        </div>
        <div className="mb8 mb0-ns w-50-ns">
          <DataEntry
            label={intl.formatMessage({ id: 'personalData.mainPhone' })}
            content={profile.homePhone}
          />
        </div>
      </div>
    </ContentBox>
  )
}

PersonalDataBox.propTypes = {
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(PersonalDataBox)
