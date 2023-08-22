import { useState } from 'react'

interface IRangePickerProps {
  range: [number, number];
  step?: number;
}

export default function RangePicker ({ range, step = 10 } : IRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState([range[0], step])
  const onChange = (newValues) => {
    // Prevents the slider from being resized. Only allows the slider to be moved.
    if (newValues[0] !== selectedRange[0] && newValues[1] !== selectedRange[1]) {
      setSelectedRange(newValues)
    }
  }

  // Creates an array using the two start/end numbers and spreads them out
  function spreadNumbers (input: [number, number]): number[] {
    const [start, end] = input
    const step = (end - start) / 9
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(Math.round(start + step * i))
    }
    return result
  }

  return (
    <div>range picker</div>
  // <Box align="center" pad="large">
  //   <Heading level={1}>{[selectedRange[0], selectedRange[1]].join(' - ')}</Heading>
  //     <Stack>
  //       <Box
  //         direction={'row'}
  //         justify="between"
  //       >
  //         {spreadNumbers(range).map((value) => (
  //           <Box
  //             key={value}
  //             width="xxsmall"
  //             height="xxsmall"
  //             align="center"
  //             pad="small"
  //             border={false}
  //           >
  //             <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
  //           </Box>
  //         ))}
  //       </Box>
  //       <RangeSelector
  //         min={range[0]}
  //         max={range[1]}
  //         size="full"
  //         values={selectedRange}
  //         onChange={onChange}
  //         round="small"
  //         step={step}
  //       />
  //     </Stack>
  //   </Box>

  )
}
