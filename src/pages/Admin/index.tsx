import Header from "../../components/Header";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import {
  Container,
  Box,
  CheckboxStyled,
  SelectStyled,
  FormStyled,
  AnimeOptionsStyled,
  FormMod,
  FormEpi,
  Wrapper
} from "./styles";
import { InputTypes } from "../../model/enums/input-types";
import { Select } from "antd";
import SchemaUtils from "../../shared/util/schema-utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import animes from "../../mock/animes.json";
import { useState } from "react";
import { FormAnime, FormEpisode, FormModerator } from "../../model/admin-forms";
import { SelectValue } from "antd/lib/select";
import { toast } from "react-hot-toast";
import InputFile from "../../components/InputFile";

const Admin = () => {
  const [categories, setCategories] = useState<SelectValue>([]);
  const [isDubbed, setIsDubbed] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [anime, setAnime] = useState<SelectValue>("");

  const inputAnime = [
    {
      name: "animeName",
      placeholder: "Nome do anime",
      label: "Nome do anime*",
      type: InputTypes.TEXT,
    },
    {
      name: "sinopse",
      placeholder: "Uma sinopse bem legal...",
      label: "Sinopse*",
      type: InputTypes.TEXT,
    },
    {
      name: "episodesNumber",
      placeholder: "Número de episódios",
      label: "Total de episódios*",
      type: InputTypes.TEXT,
    },
    {
      name: "image",
      placeholder: "Imagem URL",
      label: "Imagem do anime*",
      type: InputTypes.TEXT,
    },
  ];

  const inputModerator = [
    {
      name: "email",
      placeholder: "exemplo@mail.com",
      label: "Email*",
      type: InputTypes.EMAIL,
    },
  ];
  const inputEpisode = [
    {
      name: "episodeNumber",
      placeholder: "1",
      label: "Número*",
      type: InputTypes.TEXT,
    },
    {
      name: "videoUrl",
      placeholder: "https://streamable.com/z8xs0a",
      label: "Vídeo url*",
      type: InputTypes.TEXT,
    },
  ];

  const methodsAnime = useForm({
    resolver: yupResolver(SchemaUtils.anime()),
    mode: "all",
  });

  const methodsEpisode = useForm({
    resolver: yupResolver(SchemaUtils.episode()),
    mode: "all",
  });

  const methodsModerator = useForm({
    resolver: yupResolver(SchemaUtils.moderator()),
    mode: "all",
  });

  const onSubmitAnime = (data: FormAnime) => {
    console.log(data);
    if (!categories) {
      return toast.error("- Selecione pelo menos uma categoria");
    }
    const output = {
      animeName: data.animeName,
      sinopse: data.sinopse,
      episodesNumber: data.episodesNumber,
      isDubbed: isDubbed,
      isMovie: isMovie,
      categories: categories,
      image: data.image,
    };
    console.log(output);
  };

  const onSubmitEpisode = (data: FormEpisode) => {
    console.log(data);

    if (!anime) {
      return toast.error("- Selecione um anime");
    }

    const output = {
      anime: anime,
      episodeNumber: data.episodeNumber,
      videoUrl: data.videoUrl,
      image: data.image,
    };
    console.log(output);
  };

  const onSubmitModerator = (data: FormModerator) => {
    console.log(data);
    const output = {
      email: data.email,
    };
    console.log(output);
  };

  const { Option } = Select;

  const teste = ["Shoujo", "Shounen", "Aventura", "Ação"].sort();

  return (
    <>
      <Header />
      <Container>
        <Box>
          <h2>Adicionar anime:</h2>
          <FormProvider {...methodsAnime}>
            <FormStyled
              onSubmit={methodsAnime.handleSubmit(onSubmitAnime)}
              autoComplete="off"
            >
              {inputAnime.map((input, index) => (
                <InputText
                  key={`${input.name}-anime-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                />
              ))}
              <AnimeOptionsStyled>
                <CheckboxStyled
                  name="isDubbed"
                  onChange={(e) => setIsDubbed(e.target.checked)}
                >
                  Dublado
                </CheckboxStyled>
                <CheckboxStyled
                  name="isMovie"
                  onChange={(e) => setIsMovie(e.target.checked)}
                >
                  Filme
                </CheckboxStyled>
              </AnimeOptionsStyled>
              <SelectStyled
                placeholder="Selecione os gêneros"
                mode="multiple"
                onChange={(e) => setCategories(e)}
              >
                {teste.map((category, index) => (
                  <Option
                    name={category}
                    value={category}
                    key={`${category}-category-${index}`}
                  >
                    {category}
                  </Option>
                ))}
              </SelectStyled>
              <Button text="Enviar" />
            </FormStyled>
          </FormProvider>
        </Box>
        <Box>
          <h2>Adicionar episódio:</h2>
          <FormProvider {...methodsEpisode}>
            <FormEpi
              onSubmit={methodsEpisode.handleSubmit(onSubmitEpisode)}
              autoComplete="off"
            >
              <SelectStyled
                placeholder="Selecione o anime"
                onChange={(e) => setAnime(e)}
              >
                {animes.map((anime, index) => (
                  <Option
                    name={anime.name}
                    value={anime.name}
                    key={`${anime.name}-anime-${index}`}
                  >
                    {anime.name}
                  </Option>
                ))}
              </SelectStyled>
              {inputEpisode.map((input, index) => (
                <InputText
                  key={`${input.name}-episode-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input.type ?? ""}
                />
              ))}
              <Wrapper>
              <InputFile/>
              <Button text="Enviar" />
              </Wrapper>
                
            </FormEpi>
          </FormProvider>
        </Box>
        <Box>
          <h2>Adicionar moderador:</h2>
          <FormProvider {...methodsModerator}>
            <FormMod
              onSubmit={methodsModerator.handleSubmit(onSubmitModerator)}
              autoComplete="off"
            >
              {inputModerator.map((input, index) => (
                <InputText
                  key={`${input.name}-moderator-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                />
              ))}
              <Button text="Enviar" margin="0.5rem 0 0.5rem 8px" />
            </FormMod>
          </FormProvider>
        </Box>
        <Button text="Ver moderadores" />
      </Container>
    </>
  );
};

export default Admin;
