import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import actions from './actions';
import config from '../../../../config.json';
import reducer from './reducer';
import saga from './saga';
import { makeSelectFiles, makeSelectPath } from './selectors';
import walkUtils from './util';

import GenericList from '../../components/GenericList';
import ListFile from './ListFile';
import LoadingIndicator from '../../components/LoadingIndicator';
import Menu from './Menu';
import OrganizePreviews from '../../components/OrganizePreviews';

const {
  addParentDirectoryNav,
  isImage,
  parseHash,
  organizeByMedia,
} = walkUtils;

function Walk({ location: { hash } }) {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'walk', reducer });
  useInjectSaga({ key: 'walk', saga });
  const files = useSelector(makeSelectFiles());
  const statePath = useSelector(makeSelectPath());
  const [stateImages, setItems] = useState([]);
  const qsPath = parseHash('path', hash);

  useEffect(() => {
    dispatch(actions.listDirectory(qsPath));
  }, [qsPath]);

  const loading = statePath !== qsPath || files.length === 0;

  const itemFiles = files.map(file => ({
    id: file.path,
    content: file.filename,
    ...file,
  }));
  addParentDirectoryNav(itemFiles, statePath);

  const itemImages = itemFiles.filter(file => isImage(file));
  const hasImages = !loading && stateImages.length > 0;

  useEffect(() => {
    setItems(itemImages);
  }, [files]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return [
    <Helmet key="walk-Helmet">
      <title>Walk</title>
      <meta name="description" content="Description of Walk" />
    </Helmet>,
    <Menu
      key="walk-Menu"
      showMenu={hasImages}
      imageFilenames={stateImages.map(i => i.filename)}
      path={statePath}
    />,
    <GenericList
      key="walk-GenericList"
      component={ListFile}
      items={organizeByMedia(itemFiles)}
      loading={loading}
      error={false}
    />,
    <OrganizePreviews
      key="walk-OrganizePreviews"
      setItems={setItems}
      items={stateImages.map(item => ({
        ...item,
        content: [
          <span key={`label-${item.filename}`}>{item.filename}</span>,
          <img
            key={`thumbnail-${item.filename}`}
            alt="No preview yet"
            src={`http://localhost:${config.apiPort}/public/${statePath}/${item.filename}`}
            width={config.resizeDimensions.preview.width}
            height={config.resizeDimensions.preview.height}
          />,
        ],
      }))}
    />,
  ];
}

export default Walk;
