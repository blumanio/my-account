import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Spinner } from 'vtex.styleguide'
import { GenericError } from 'vtex.my-account-commons'

import BaseDropzone from './BaseDropzone'
import PictureRenderer from './PictureRenderer'

class PictureUploader extends Component<Props> {
  public state = {
    error: null,
    isLoading: false,
    finishedUpload: false,
    previewPicture: null,
    file: null,
  }

  private handleImageDrop = async (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles[0]) {
      this.setState({
        error: null,
        finishedUpload: true,
        previewPicture: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0],
      })
    } else {
      this.setState({ error: 'alert.fileTooBig' })
    }
  }

  private handleErrorReset = () => {
    this.setState({ error: null })
  }

  private handleSaveClick = async (event: any) => {
    event.stopPropagation()
    this.props.onCloseClick()
  }

  public render() {
    const { currentPicture } = this.props
    const { error, isLoading, finishedUpload, previewPicture } = this.state
    const boxText = finishedUpload
      ? 'upload.photoUpdated'
      : 'upload.dragYourPhoto'

    return (
      <Fragment>
        {error && (
          <div className="mb6">
            <GenericError onDismiss={this.handleErrorReset} errorId={error} />
          </div>
        )}
        <BaseDropzone
          disabled={isLoading}
          onClick={this.handleErrorReset}
          onDrop={this.handleImageDrop}>
          <div className="w-100 w5-ns flex flex-column justify-between items-center">
            {isLoading ? (
              <Fragment>
                <Spinner />
                <div className="mt8 f5 tc gray">
                  <FormattedMessage id="upload.loading" />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="h4 w4 mb8">
                  <PictureRenderer
                    imagePath={previewPicture || currentPicture}
                  />
                </div>
                <div className="mb6 f5 tc c-muted-1 lh-copy">
                  <FormattedMessage id={boxText} />
                </div>
                {finishedUpload ? (
                  <Fragment>
                    <div className="mb4 w-100">
                      <Button block size="small" onClick={this.handleSaveClick}>
                        <FormattedMessage id="upload.save" />
                      </Button>
                    </div>
                    <Button block size="small" variation="secondary">
                      <FormattedMessage id="upload.chooseAgain" />
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="flex w-100 items-center mb6">
                      <div className="flex-auto bt b--muted-4" />
                      <span className="mh3 c-muted-1">
                        <FormattedMessage id="upload.or" />
                      </span>
                      <div className="flex-auto bt b--muted-4" />
                    </div>
                    <Button block size="small">
                      <FormattedMessage id="upload.choosePhoto" />
                    </Button>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </BaseDropzone>
      </Fragment>
    )
  }
}

interface Props {
  currentPicture?: string
  onCloseClick: () => void
}

export default PictureUploader
