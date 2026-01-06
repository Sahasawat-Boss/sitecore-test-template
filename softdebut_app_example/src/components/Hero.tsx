'use client';

import React, { JSX } from 'react';
import { Image, ImageField, Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';

interface Fields {
  data?: {
    datasource?: {
      Title?: {
        jsonValue?: TextField;
      };
      Subtitle?: {
        jsonValue?: TextField;
      };
      BackgroundImage?: {
        jsonValue?: ImageField;
      };
    };
    contextItem?: {
      Title?: {
        jsonValue?: TextField;
      };
      Subtitle?: {
        jsonValue?: TextField;
      };
      BackgroundImage?: {
        jsonValue?: ImageField;
      };
    };
  };
  Title?: TextField;
  Subtitle?: TextField;
  BackgroundImage?: ImageField;
}

type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeroProps): JSX.Element => {
  const { page } = useSitecore();
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const sxaStyles = props.params?.styles ?? '';
  const id = props.params?.RenderingIdentifier ?? null;

  // Get fields from datasource or props
  const titleField = 
    props.fields?.Title || 
    datasource?.Title?.jsonValue || 
    (page?.layout?.sitecore?.route?.fields?.Title as TextField);
  
  const subtitleField = 
    props.fields?.Subtitle || 
    datasource?.Subtitle?.jsonValue;
  
  const backgroundImageField = 
    props.fields?.BackgroundImage || 
    datasource?.BackgroundImage?.jsonValue;

  // Get background image URL
  const backgroundImageUrl = backgroundImageField?.value?.src || '';
  const backgroundStyle = backgroundImageUrl 
    ? { 
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div 
      className={`component hero ${sxaStyles}`} 
      id={id ? id : undefined}
      style={backgroundStyle}
    >
      <div className="component-content hero-content">
        {titleField && (
          <Text
            tag="h1"
            field={titleField}
            className="hero-title"
            editable={page.mode.isEditing}
          />
        )}
        {subtitleField && (
          <Text
            tag="p"
            field={subtitleField}
            className="hero-subtitle"
            editable={page.mode.isEditing}
          />
        )}
        {backgroundImageField && !backgroundImageUrl && page.mode.isEditing && (
          <div className="hero-background-placeholder">
            [Add Background Image]
          </div>
        )}
      </div>
    </div>
  );
};

