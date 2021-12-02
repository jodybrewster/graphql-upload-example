import { gql, useMutation } from "@apollo/client"
import JSON from "react-json-view"

import React, { useState } from "react"
import { Box, Text, Flex, Heading } from "rebass"

import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms"

const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!, $min: Int = 0, $max: Int = 0) {
    uploadFile(file: $file, min: $min, max: $max) {
      frequencies {
        count
        word
      }
    }
  }
`

const UploadFile = () => {
  const [mutate, { loading, error, data }] = useMutation(SINGLE_UPLOAD)
  const [min, setMin] = useState(7);
  const [max, setMax] = useState(8);
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && mutate({ variables: { file, min, max } })

  const onMinChange = (e: any) => setMin(parseInt(e.target.value));
  const onMaxChange = (e: any) => setMax(parseInt(e.target.value));


  if (loading) return <div>Loading...</div>
  if (data) return <JSON src={data} />
  if (error) return <JSON src={error} />

  return (
    <React.Fragment>
      <Box as="form" onSubmit={(e) => e.preventDefault()} py={3}>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <Label htmlFor="min">min</Label>
            <Input id="min" name="min" type="Number" placeholder="min" defaultValue={min}  onChange={onMinChange} />
          </Box>
        </Flex>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <Label htmlFor="max">max</Label>
            <Input id="max" name="max" type="Number" placeholder="max" defaultValue={max}  onChange={onMaxChange}/>
          </Box>
        </Flex>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <input type="file" required onChange={onChange} />
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  )
}

export const Home = (props: any) => {
  return (
    <><Box>
      <Heading>Demo</Heading>
      <Text fontSize={3}>Enter the minimum and maxiumum word counts you wish to filter on.</Text>
      <Text fontSize={3}>Then upload the file you wish to process.  Use test_file.txt in the project root for optimal results ;) </Text>
    </Box><Box>
        <UploadFile />
      </Box></>
  )
}
