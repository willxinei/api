import handlebars from "handlebars";
import fs from "fs";
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../fakes/dtos/IParseMailTemplateDTO";

export default class HandleBars implements IMailTemplateProvider {
   public async parse({
      file,
      variables,
   }: IParseMailTemplateDTO): Promise<string> {
      const templateFileContent = await fs.promises.readFile(file, {
         encoding: "utf-8",
      });

      const parseTemplate = handlebars.compile(templateFileContent);

      return parseTemplate(variables);
   }
}
