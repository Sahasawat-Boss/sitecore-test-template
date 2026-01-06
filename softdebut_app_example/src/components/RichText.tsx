'use client';

import React, { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  useSitecore,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  data?: {
    datasource?: {
      Text?: {
        jsonValue?: RichTextField;
      };
    };
    contextItem?: {
      Text?: {
        jsonValue?: RichTextField;
      };
    };
  };
  Text?: RichTextField | {
    value?: string;
    jsonValue?: RichTextField;
  };
}

type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  const { page } = useSitecore();
  const sxaStyles = props.params?.styles ?? '';
  const id = props.params?.RenderingIdentifier ?? null;

  // Try to get Text field from various sources
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const textFieldFromDatasource = datasource?.Text?.jsonValue;
  const textFieldFromProps = props.fields?.Text;
  
  // Handle different field structures
  let textField: RichTextField | undefined;
  if (textFieldFromProps) {
    // If it's already a RichTextField, use it
    if ('value' in textFieldFromProps && typeof textFieldFromProps.value === 'string') {
      // Convert simple value to RichTextField format
      textField = textFieldFromProps as RichTextField;
    } else if ('jsonValue' in textFieldFromProps) {
      textField = textFieldFromProps.jsonValue;
    } else {
      textField = textFieldFromProps as RichTextField;
    }
  } else if (textFieldFromDatasource) {
    textField = textFieldFromDatasource;
  } else {
    textField = page?.layout?.sitecore?.route?.fields?.Text as RichTextField;
  }

  if (!textField) {
    return (
      <div className={`component rich-text ${sxaStyles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-text">[Rich Text]</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`component rich-text ${sxaStyles}`} id={id ? id : undefined}>
      <div className="component-content">
        <ContentSdkRichText
          field={textField}
          className="field-text"
        />
      </div>
    </div>
  );
};

