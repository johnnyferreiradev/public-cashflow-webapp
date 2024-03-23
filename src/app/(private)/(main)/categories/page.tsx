import { Image } from 'nemea-ui';

import { PageWithInfo } from '@/components/modules/general/PageWithInfo';
import Card from '@/components/ui/Card';
import CategoriesTable from './components/CategoriesTable';

import questionIllustration from '@/assets/images/question.svg';

export default function Categories() {
  return (
    <PageWithInfo.Root>
      <PageWithInfo.Main>
        <h2 className="font-bold text-xl md:!text-2xl mb-1 pl-4">Categorias</h2>
        <CategoriesTable />
      </PageWithInfo.Main>
      <PageWithInfo.InfoSection>
        <Card className="flex flex-col items-center gap-6">
          <Image
            src={questionIllustration.src}
            alt="Tip"
            className="w-48 my-4"
          />

          <div>
            <h3 className="text-base font-medium">
              O que é uma categoria de transação?
            </h3>
            <p className="text-sm text-gray-400">
              Categorias organizam despesas e receitas para um controle
              financeiro eficiente na administração da empresa.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium">
              Por que criar uma categoria?
            </h3>
            <p className="text-sm text-gray-400">
              Facilitam o entendimento dos gastos, essenciais para um
              planejamento financeiro preciso e para obter insights sobre as
              finanças da empresa.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium">
              Como escolher uma categoria adequada?
            </h3>
            <p className="text-sm text-gray-400">
              Ao criar uma transação, associe-a a uma categoria que represente o
              tipo de despesa ou receita de forma simples e clara.
            </p>
          </div>
        </Card>
      </PageWithInfo.InfoSection>
    </PageWithInfo.Root>
  );
}
