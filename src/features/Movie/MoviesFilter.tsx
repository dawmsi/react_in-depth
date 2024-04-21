import { FilterAltOffOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  FormControl,
  Paper,
  TextField,
  debounce,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { KeywordItem, client } from '../../api/tmdb';
import { useMemo, useState } from 'react';

export interface Filters {
  keywords: KeywordItem[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

const MoviesFilter = ({ onApply }: MoviesFilterProps) => {
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
    },
  });

  const fetchKeywords = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query) {
          setKeywordsLoading(true);

          const options = await client.getKeywords(query);
          setKeywordsLoading(false);
          setKeywordsOptions(options);
        } else {
          setKeywordsOptions([]);
        }
      }, 800),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5, width: '100%' }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ m: 2, display: 'block' }}>
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                fullWidth
                multiple
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
                value={value}
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => onChange(value)}
                onInputChange={(_, value) => fetchKeywords(value)}
              />
            )}
          />
        </FormControl>
        <Button
          sx={{ m: 2 }}
          type="submit"
          variant="contained"
          startIcon={<FilterAltOffOutlined />}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};

export default MoviesFilter;
